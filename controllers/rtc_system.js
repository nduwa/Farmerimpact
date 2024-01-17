const Sequelize = require('sequelize');
const { Op } = Sequelize;
const moment = require('moment');
const format = moment().format("YYYY-MM-DD hh:mm:ss");
const dateFormat = moment().format("YYYY-MM-DD");
const bcrypt = require('bcryptjs');
const Farmers = require('../models/farmers');
const Household = require('../models/households');
const Group = require('../models/groups');
const Training = require('../models/rtc_training');
const Station = require('../models/rtc_station');
const Supplier = require('../models/rtc_supplier');
const Users = require('../models/rtc_users');
const Season = require('../models/rtc_seasons');
const sequelize = require('../utils/database');
const Roles = require('../models/roles');
const Staff = require('../models/staff');
const Mobile_App_Modules = require('../models/rtc_mobile_app_modules');
const Mobile_App = require('../models/rtc_mobile_app_access_control');
const User_Module = require('../models/rtc_user_access');
const Transaction = require('../models/rtc_transactions');
const Lot_data = require('../models/day_lots');
const Bucket = require('../models/bucketing');
const Drying = require('../models/drying');
const Readings = require('../models/rtc_readings');
// ====== get index as login form
exports.getIndex = (req, res, next) =>{
    let message = req.flash('error');
    if(message.length > 0) { message = message[0]; }
    else { message = null; }
    Season.findOne({where:{Default:1,Location:'RTC'}},{order:[['id', 'DESC']]})
    .then(season =>{
        req.session.season = season;
        console.log(req.session.season.Label);
        res.render('index', {
            session_season: req.session.season,
            pageTitle: 'RTC - Dashboard',
            path: '/',
            errorMessage: message
        })
    })
    .catch(err =>{console.log(err);})
    
}
// ==== post login
exports.postLogin = (req, res, next) =>{
    const {username,password} =req.body;
    Users.findOne({where:{Name_User:username}})
    .then(async user => {
        if(!user){
            console.log('No user');
            req.flash('error', 'Your username is not exist!');
            return res.redirect('/')
        }else{
            if(user.status == '1'){
                let hashedPassword = user.password;	
	            bcrypt.compare(password, hashedPassword, (err, result) => {
	            if (err) {
	               console.log('bcrypt - error - ', err);
	            } else {
                    console.log('bcrypt - result - ', result);
                    if(result === true){
                        console.log('loggedIn');
                        req.session.isLoggedIn = true
                        req.session.user = user;
                        return res.redirect('/rtc11');
                    }else{
                        console.log('loggedOut');
                        req.flash('error', 'Your password is not exist!');
                        res.redirect('/')
                    }
	            }
	            });
            }else{
                req.flash('error', 'You are not allowed to enter into the system Please conctact the Administration!');
                return res.redirect('/')
            }
            
        }
    })
    .catch(err => console.log(err));
}
// == get logout 
exports.getLogout = (req, res, next) =>{
    req.session.destroy(err =>{
        if(err) throw err;
        else{res.redirect('/');}
    });
};
// === get index inside
exports.getHome = (req, res, next) =>{
    const userID = req.session.user.id;
    const kp = req.session.user.__kp_User;
    Users.findOne({where:{id:userID}})
    .then(user =>{
        Staff.findOne({where:{_kf_user:kp}})
        .then(staff =>{
            req.session.staff = staff;
            User_Module.findOne({where:{user_ID:userID}})
            .then(contrl =>{
                req.session.access = contrl;
                Mobile_App_Modules.findAll({where:{platform:'dashboard'}})
                .then(modude =>{
                    req.session.module = modude;
                    res.render('files/home',{
                        pageTitle: 'RTC - Dashboard',
                        path: '/rtc11',
                        session_data: req.session.user,
                        session_season: req.session.season,
                        isAuthenticated:req.session.isLoggedIn,
                        role: req.session.staff,
                        access: req.session.access,
                        modude_session: req.session.module,
                        moment: format,
                        user_data: user
                    });
                })
            })
        })
    })
    .catch(err => {
        console.log(err);
    }); 
}
//===== getting users data  ===
exports.getUsers = (req, res, next) =>{
    let message = req.flash('error');
    if(message.length > 0) { message = message[0]; }
    else { message = null; }
    sequelize.query(`SELECT s.__kp_Staff,s._kf_Location,s._kf_Supplier,s._kf_Station, 
    s._kf_User,s.userID,s.Name,s.Phone,s.Role,s.Gender,u.id,u.created_at,u.__kp_User,
    u._kf_Location,u.Email,u.Name_Full,u.Name_User,u.status,u.id FROM staff s 
    INNER JOIN rtc_users u ON s._kf_User = u.__kp_User 
    ORDER BY u.id DESC`,
    { type: Sequelize.QueryTypes.SELECT })
    .then(data =>{
        res.render('files/users',{
            session_data: req.session.user,
            session_season: req.session.season,
            role: req.session.staff,
            access: req.session.access,
            modude_session: req.session.module,
            pageTitle: 'RTC - Dashboard',
            path: '/rtc12',
            isAuthenticated:req.session.isLoggedIn,
            errorMessage: message,
            user: data
        })
    })
    .catch(err => {
        console.log(err);
    })  
};
//===== get user access ======
exports.getUserAccess = (req, res, next) =>{
    const userID = req.params.userID;
    const userStatus = req.params.userStatus;
    Users.update({status:userStatus},{where:{id:userID}})
    .then(userstatus =>{
        req.flash('error', 'User access assigned Successfuly!');
        res.redirect('/rtc12');
    }).catch(err=>{console.log(err);})
};
//==== edit_user_password ===
exports.PostEditUserPassword = async (req, res, next) =>{
    const { kp_userid,kp_user,email,newPassword,confirmPassword } = req.body;
    let hashPassword = await bcrypt.hash(newPassword, 8);
    const col = {Email:email,password:hashPassword};
    const condition = {id:kp_userid,__kp_user:kp_user};
    if(newPassword !== confirmPassword){
        req.flash('error', 'Your new password are matching!');
        res.redirect('/rtc12');
    }else{
        Users.update(col,{where:condition})
        .then(result =>{
            req.flash('error', 'Account edited successfully, Thank you!');
            res.redirect('/rtc12');
        })
        .catch(err =>{
            console.log(err);
        })
    }
};
//==== get phone modules ===
exports.PostPhoneModules = (req, res, next) =>{
    let message = req.flash('error');
    if(message.length > 0) { message = message[0]; }
    else { message = null; }
    const user_ID = req.body.kp_userid;
    Users.findOne({where:{id:user_ID}})
    .then(user =>{
        Mobile_App_Modules.findAll({where:{platform:'mobile'}})
        .then(module =>{
            Mobile_App.findAll({where:{userid:user_ID,platform:'mobile'}})
            .then(access =>{
                res.render('files/mobile',{
                    session_data: req.session.user,
                    session_season: req.session.season,
                    role: req.session.staff,
                    access: req.session.access,
                    modude_session: req.session.module,
                    pageTitle: 'RTC - Dashboard',
                    path: '/rtc12',
                    isAuthenticated:req.session.isLoggedIn,
                    errorMessage: message,
                    user: user,
                    mobile: module,
                    module_access:access
                })
            })
            
        })
    }) 
};
//==== post mobile control ====
exports.PostMobileControl = (req, res, next) =>{
    const platform = 'mobile';
    const { index_data,mobile_id,user_ID } = req.body;
    const num = 0;
    Mobile_App.findAndCountAll({where:{userid:user_ID,platform:platform}})
        .then(module =>{
            const {count, rows} = module;
            if(count > num){
                console.log('inside');
                Mobile_App.destroy({where:{userid:user_ID,platform:platform}})
                .then(data =>{
                    console.log('destroyed');
                    if(mobile_id.length > 1){
                        console.log('true');
                        for(let i = 0; i < mobile_id.length; i++){
                            const mobile = mobile_id[i];
                            const user = user_ID[i];
                            console.log(mobile);
                            Mobile_App.create({
                                created_at:format,
                                moduleid:mobile,
                                userid:user,
                                view_record:0,
                                add_record:0,
                                delete_record:0,
                                edit_record:0,
                                platform:platform
                            })
                            .then(data =>{
                                console.log(mobile,'Done');
                            })
                            .catch(err=>{console.log(err);})
                        }
                        req.flash('error', 'Module assigned successfully, Thank you!');
                        res.redirect('/rtc12');
                    }else{
                        console.log('false');
                        const mobile = mobile_id;
                        const user = user_ID;
                        console.log(mobile);
                        Mobile_App.create({
                            created_at:format,
                            moduleid:mobile,
                            userid:user,
                            view_record:0,
                            add_record:0,
                            delete_record:0,
                            edit_record:0,
                            platform:platform
                        })
                        .then(data =>{
                            console.log(mobile,'Done');
                            req.flash('error', 'Module assigned successfully, Thank you!');
                            res.redirect('/rtc12');
                        })
                        .catch(err=>{console.log(err);})
                    }
                })
                .catch(err =>{console.log(err);})
            }else{
                console.log('outside');
                for(let i = 0; i < mobile_id.length; i++){
                    const mobile = mobile_id[i];
                    const user = user_ID[i];
                    console.log(mobile);
                    Mobile_App.create({
                        created_at:format,
                        moduleid:mobile,
                        userid:user,
                        view_record:1,
                        add_record:1,
                        delete_record:1,
                        edit_record:1,
                        platform:platform
                    })
                    .then(data =>{
                        console.log(mobile,'Done');
                    })
                    .catch(err=>{console.log(err);})
                }
                req.flash('error', 'Module assigned successfully, Thank you!');
                res.redirect('/rtc12');
            }
        })
};
//==== get computer modules ====
exports.PostComputerModules = (req, res, next) =>{
    let message = req.flash('error');
    if(message.length > 0) { message = message[0]; }
    else { message = null; }
    const user_ID = req.body.kp_userid;
    Users.findOne({where:{id:user_ID}})
    .then(user =>{
        User_Module.findAndCountAll({where:{user_ID:user_ID}})
        .then(modules =>{
            const { count, rows } = modules;
            if(count > 0){
                User_Module.findOne({where:{user_ID:user_ID}})
                .then(view_module =>{
                    res.render('files/computer',{
                        session_data: req.session.user,
                        session_season: req.session.season,
                        role: req.session.staff,
                        access: req.session.access,
                        modude_session: req.session.module,
                        pageTitle: 'RTC - Dashboard',
                        path: '/rtc12',
                        isAuthenticated:req.session.isLoggedIn,
                        errorMessage: message,
                        user: user,
                        user_access:view_module
                    })
                }).catch(err=>{console.log(err);})
            }else{
                console.log('outside');
                User_Module.create({
                    user_ID:user_ID,
                    created_at: format
                })
                .then(created =>{
                    console.log('created!');
                    User_Module.findOne({where:{user_ID:user_ID}})
                    .then(view_module =>{
                        res.render('files/computer',{
                            session_data: req.session.user,
                            session_season: req.session.season,
                            role: req.session.staff,
                            access: req.session.access,
                            modude_session: req.session.module,
                            pageTitle: 'RTC - Dashboard',
                            path: '/rtc12',
                            isAuthenticated:req.session.isLoggedIn,
                            errorMessage: message,
                            user: user,
                            user_access:view_module
                        })
                    }).catch(err=>{console.log(err);})
                }).catch(err=>{console.log(err);})
            }
        }).catch(err=>{console.log(err);})
    }).catch(err=>{console.log(err);}) 
};
//==== post computer module =====
exports.PostComputerControl = (req, res, next) =>{
    let {userID,registers,recent_register,station_farmer,scynced_farmer} = req.body;
    let {inspection,farmer_inspection,wet_mill_audit} = req.body;
    let {training,session,participants,courses} = req.body;
    let {coffee_purchase,untraceable,sc_daily_journal,cws_daily_journal,general_harvest,site_harvest} = req.body;
    let {coffee_inventory,assign_parchment,parchment_stock,parchment_processing,parchment_transport,parchment_reception} = req.body;
    let {cws_finance,new_report,view_report} = req.body;
    let {cash_requisition,new_cash_requisition,view_cash_requisition,pending_requisition,approved_requisition} = req.body;
    let {app_setting,translation,inspection_question} = req.body;
    let {manage_user,list_user} = req.body;
    if(registers == 'on'){registers = '1'}else{registers = '0'}
    if(recent_register == 'on'){recent_register = '1'}else{recent_register = '0'}
    if(station_farmer == 'on'){station_farmer = '1'}else{station_farmer = '0'}
    if(scynced_farmer == 'on'){scynced_farmer = '1'}else{scynced_farmer = '0'}
    if(inspection == 'on'){inspection = '1'}else{inspection = '0'}
    if(farmer_inspection == 'on'){farmer_inspection = '1'}else{farmer_inspection = '0'}
    if(wet_mill_audit == 'on'){wet_mill_audit = '1'}else{wet_mill_audit = '0'}
    if(training == 'on'){training = '1'}else{training = '0'}
    if(session == 'on'){session = '1'}else{session = '0'}
    if(participants == 'on'){participants = '1'}else{participants = '0'}
    if(courses == 'on'){courses = '1'}else{courses = '0'}
    if(coffee_purchase == 'on'){coffee_purchase = '1'}else{coffee_purchase = '0'}
    if(untraceable == 'on'){untraceable = '1'}else{untraceable = '0'}
    if(sc_daily_journal == 'on'){sc_daily_journal = '1'}else{sc_daily_journal = '0'}
    if(cws_daily_journal == 'on'){cws_daily_journal = '1'}else{cws_daily_journal = '0'}
    if(general_harvest == 'on'){general_harvest = '1'}else{general_harvest = '0'}
    if(site_harvest == 'on'){site_harvest = '1'}else{site_harvest = '0'}
    if(coffee_inventory == 'on'){coffee_inventory = '1'}else{coffee_inventory = '0'}
    if(assign_parchment == 'on'){assign_parchment = '1'}else{assign_parchment = '0'}
    if(parchment_stock == 'on'){parchment_stock = '1'}else{parchment_stock = '0'}
    if(parchment_processing == 'on'){parchment_processing = '1'}else{parchment_processing = '0'}
    if(parchment_transport == 'on'){parchment_transport = '1'}else{parchment_transport = '0'}
    if(parchment_reception == 'on'){parchment_reception = '1'}else{parchment_reception = '0'}
    if(cws_finance == 'on'){cws_finance = '1'}else{cws_finance = '0'}
    if(new_report == 'on'){new_report = '1'}else{new_report = '0'}
    if(view_report == 'on'){view_report = '1'}else{view_report = '0'}
    if(cash_requisition == 'on'){cash_requisition = '1'}else{cash_requisition = '0'}
    if(new_cash_requisition == 'on'){new_cash_requisition = '1'}else{new_cash_requisition = '0'}
    if(view_cash_requisition == 'on'){view_cash_requisition = '1'}else{view_cash_requisition = '0'}
    if(pending_requisition == 'on'){pending_requisition = '1'}else{pending_requisition = '0'}
    if(approved_requisition == 'on'){approved_requisition = '1'}else{approved_requisition = '0'}
    if(app_setting == 'on'){app_setting = '1'}else{app_setting = '0'}
    if(translation == 'on'){translation = '1'}else{translation = '0'}
    if(inspection_question == 'on'){inspection_question = '1'}else{inspection_question = '0'}
    if(manage_user == 'on'){manage_user = '1'}else{manage_user = '0'}
    if(list_user == 'on'){list_user = '1'}else{list_user = '0'}
    const col = {registers,recent_register,station_farmer,scynced_farmer,
        inspection,farmer_inspection,wet_mill_audit,
        training,session,participants,courses,
        coffee_purchase,untraceable,sc_daily_journal,cws_daily_journal,general_harvest,site_harvest,
        coffee_inventory,assign_parchment,parchment_stock,parchment_processing,parchment_transport,parchment_reception,
        cws_finance,new_report,view_report,
        cash_requisition,new_cash_requisition,view_cash_requisition,pending_requisition,approved_requisition,
        app_setting,translation,inspection_question,
        manage_user,list_user
    }
    User_Module.update(col,{where:{user_ID:userID}})
    .then(updated =>{
        req.flash('error', 'Module Assigned Successfuly!');
        res.redirect('/rtc12');
    }).catch(err=>{console.log(err);})   
};
// ====== get farmes ======
exports.getFarmers = (req, res, next) =>{
    sequelize.query(`SELECT *,f.Name as fname,s.Name as sname FROM rtc_farmers f 
    INNER JOIN rtc_groups g ON f._kf_Group = g.__kp_Group 
    INNER JOIN rtc_station s ON f._kf_Station = s.__kp_Station LIMIT 10000`,
    { type: Sequelize.QueryTypes.SELECT })
    .then(data =>{
        res.render('files/farmers',{
            session_data: req.session.user,
            session_season: req.session.season,
            role: req.session.staff,
            access: req.session.access,
            modude_session: req.session.module,
            pageTitle: 'RTC - Dashboard',
            path: '/rtc13',
            isAuthenticated:req.session.isLoggedIn,
            farmers: data
        })
    })
    .catch(err=>{
        console.log(err);
    })
};
// ====== get farmers per station ======
exports.getStationFarmers = (req, res, next) =>{
    Station.findAll()
    .then(station =>{
        sequelize.query(`SELECT *,f.Name as fname,s.Name as sname FROM rtc_farmers f 
        INNER JOIN rtc_groups g ON f._kf_Group = g.__kp_Group 
        INNER JOIN rtc_station s ON f._kf_Station = s.__kp_Station LIMIT 100`,
        { type: Sequelize.QueryTypes.SELECT })
        .then(data =>{
            res.render('files/station_farmer',{
                session_data: req.session.user,
                session_season: req.session.season,
                role: req.session.staff,
                access: req.session.access,
                modude_session: req.session.module,
                pageTitle: 'RTC - Dashboard',
                path: '/rtc14',
                isAuthenticated:req.session.isLoggedIn,
                farmers: data,
                station: station
            })
        })
        .catch(err=>{console.log(err);})
    })
    .catch(err=>{console.log();})
};
// ====== get farmer inspection ======
exports.getInspections = (req, res, next) =>{
    sequelize.query(`SELECT *,f.Name as fname,s.Name as sname,i.created_at as idate, 
    i.created_by as so FROM rtc_farmers f 
    INNER JOIN rtc_groups g ON f._kf_Group = g.__kp_Group 
    INNER JOIN rtc_households h ON f._kf_Household = h.__kp_Household
    INNER JOIN rtc_inspections i ON f._kf_Household = i._kf_Household
    INNER JOIN rtc_training t ON i._kf_Course = t.__kp_Course
    INNER JOIN inspection_questions q ON i._kf_Course = q._kf_Course
    INNER JOIN rtc_station s ON f._kf_Station = s.__kp_Station LIMIT 10000`,
    { type: Sequelize.QueryTypes.SELECT })
    .then(data =>{
        res.render('files/inspection',{
            session_data: req.session.user,
            session_season: req.session.season,
            role: req.session.staff,
            access: req.session.access,
            modude_session: req.session.module,
            pageTitle: 'RTC - Dashboard',
            path: '/rtc16',
            isAuthenticated:req.session.isLoggedIn,
            farmers: data
        })
    })
    .catch(err=>{
        console.log(err);
    })
};
// ====== get coffees purchases(SC daily journal) =====
exports.getSCDailyJournals = (req, res, next) =>{
    let button = '';
    let message = req.flash('error');
    if(message.length > 0) { message = message[0]; }
    else { message = null; }
    let msg = req.flash('success');
    if(msg.length > 0) { msg = msg[0]; button ='Active';  }
    else { msg = null; button = ''; }
    const scid = req.query.SCID;
    const station = req.session.staff._kf_Station;
    var sql = '';
    if(scid){
        sql =`SELECT *,SUM( rtc_transactions.kilograms) as kilo,
        SUM( rtc_transactions.bad_kilograms) as floater,
        SUM( rtc_transactions.cash_paid) as cash,
        SUM( rtc_transactions.total_mobile_money_payment ) as momo
        FROM rtc_transactions,rtc_users,staff 
        WHERE rtc_transactions.username = rtc_users.Name_User 
        AND rtc_users.__kp_User = staff._kf_User
        AND rtc_transactions.status = 0
        AND rtc_transactions._kf_Station ='${station}'
        AND rtc_transactions.site_day_lot = '${scid}'`
        sequelize.query(sql,{ type: Sequelize.QueryTypes.SELECT })
        .then(personel =>{
            Transaction.findAll({attributes: ['recordid'], raw: true })
            .then(record =>{
                Transaction.findAll({where:{site_day_lot:scid,status:0,_kf_Station:station}})
                .then(all =>{
                    Lot_data.findAll({where:{site_day_lot:scid}})
                    .then(site =>{
                        res.render('files/sc_daily_details',{
                            session_data: req.session.user,
                            session_season: req.session.season,
                            role: req.session.staff,
                            access: req.session.access,
                            modude_session: req.session.module,
                            pageTitle: 'RTC - Dashboard',
                            path: '/rtc22',
                            isAuthenticated:req.session.isLoggedIn,
                            errorMessage: message,
                            errorMessage:msg,
                            button:site,
                            approve:req.session.approve,
                            sc_detail: personel,
                            record:record,
                            famers:all
                        })
                    })
                })
            })
        }).catch(err =>{console.log(err);})
    }else{
        res.render('files/sc_daily_journal',{
            session_data: req.session.user,
            session_season: req.session.season,
            role: req.session.staff,
            access: req.session.access,
            modude_session: req.session.module,
            pageTitle: 'RTC - Dashboard',
            path: '/rtc22',
            errorMessage: message,
            isAuthenticated:req.session.isLoggedIn
        })
    }
};
// ====== get coffees purchases(SC daily journal) by search =====
exports.getSearchedSCDailyJournals = (req, res, next) =>{
    const query = req.query.q;
    const queryf = req.query.f;
    const queryt = req.query.t;
    const station = req.session.staff._kf_Station;
    const season = req.session.season.__kp_Season;
    var sql = '';
    if(query == '') {
        sql = `SELECT *,SUM(rtc_transactions.kilograms) as kilos,SUM(rtc_transactions.bad_kilograms) as floaters,
        SUM(rtc_transactions.unitprice) as price, SUM(rtc_transactions.bad_unit_price) as fprice,
        rtc_transactions.paper_receipt,SUM(rtc_transactions.cash_paid) as payment
        FROM rtc_transactions,rtc_users,staff 
        WHERE rtc_transactions.username = rtc_users.Name_User 
        AND rtc_users.__kp_User = staff._kf_User
        AND rtc_transactions.status = 0
        AND rtc_transactions._kf_Station ='${station}' 
        AND rtc_transactions.transaction_date BETWEEN '${queryf}' AND '${queryt}'
        AND rtc_transactions._kf_Season ='${season}'
        GROUP BY rtc_transactions.transaction_date,rtc_transactions.username LIMIT 10`;
    }else{
        sql = `SELECT *,SUM(rtc_transactions.kilograms) as kilos,SUM(rtc_transactions.bad_kilograms) as floaters,
        SUM(rtc_transactions.unitprice) as price, SUM(rtc_transactions.bad_unit_price) as fprice,
        rtc_transactions.paper_receipt,SUM(rtc_transactions.cash_paid) as payment 
        FROM rtc_transactions,rtc_users,staff 
        WHERE rtc_transactions.username = rtc_users.Name_User 
        AND rtc_users.__kp_User = staff._kf_User AND staff.Name LIKE '%${query}%'
        AND rtc_transactions.status = 0
        AND rtc_transactions._kf_Station ='${station}'
        AND rtc_transactions._kf_Season ='${season}'
        GROUP BY rtc_transactions.transaction_date,rtc_transactions.username LIMIT 10`;
    }
    sequelize.query(sql,{ type: Sequelize.QueryTypes.SELECT })
    .then(results =>{
        res.send(results);
    }).catch(err =>{console.log(err);})
}; 
// ====== get coffees purchases(SC daily journal) sc daitails =====
exports.SaveTransactionChanges = (req, res, next) =>{
    let action = req.body.action;
    const user = req.session.user.id;
    const station = req.session.staff._kf_Station;
    const supplier = req.session.staff._kf_Supplier;
    const season = req.session.season.__kp_Season;
    if(action == 'save_Transaction'){
        const {lotnumber,receipt_no,site_day_lot,trans_date,cherry,cherry_price,floaters,floater_price,certification} = req.body;
        const cash = cherry*cherry_price+floaters*floater_price;
        const col = {kilograms:cherry,unitprice:cherry_price,bad_kilograms:floaters,bad_unit_price:floater_price,
        paper_receipt:receipt_no,transaction_date:trans_date,certification:certification,cash_paid:cash,edited:'1'}
        const cond = {lotnumber:lotnumber,site_day_lot:site_day_lot,status:0}
        Transaction.update(col,{where:cond})
         .then(result =>{
            req.flash('error', 'Transaction Edited Successfuly!');
            res.redirect(`/rtc22?SCID=${site_day_lot}`)
        })
     .catch(err=>{console.log(err);})
    }
    if(action == 'Add_info'){
        const {commission_fees,transport_fees,floater_transport_fee,total_payment} = req.body;
        const {userID,site_day_lot,day_lot,cherry_price,floater_price,floaters,cherries} = req.body;
        const col = {site_cherry_kgs:cherries,site_cherry_price:cherry_price,site_Floater_kgs:floaters,
            site_Floater_price:floater_price,commission_fees:commission_fees,transport_fees:transport_fees,
            floater_transport_fee:floater_transport_fee,site_total_payment:total_payment};
        const cond = {site_day_lot:site_day_lot,day_lot_number:day_lot}
        Lot_data.findAndCountAll({where:cond})
        .then(data => {
            const {count,row} = data;
            if(count > 0){
                Lot_data.update(col,{where:cond})
                .then(site_updated =>{
                    req.session.approve = site_updated;
                    req.flash('success', 'Additional Info Updated Successfuly!');
                    res.redirect(`/rtc22?SCID=${site_day_lot}`)
                })
            }else{
                Lot_data.create({ created_at:format,created_by:user, _kf_Supplier:supplier,
                    _kf_Station:station,day_lot_number:day_lot,UserID:userID,site_day_lot:site_day_lot,
                    site_cherry_kgs:cherries,site_cherry_price:cherry_price,site_Floater_kgs:floaters,
                    site_Floater_price:floater_price,commission_fees:commission_fees,
                    transport_fees:transport_fees,floater_transport_fee:floater_transport_fee,
                    site_total_payment:total_payment,status:1
                })
                .then(result =>{
                    req.session.approve = result;
                    req.flash('success', 'Additional Info Saved Successfuly!');
                    res.redirect(`/rtc22?SCID=${site_day_lot}`)
                })
            }
        })  
    }
    if(action == 'Approve_transaction'){
        // const col = {__kp_Log, recordid, approved, approved_at,
        //      approved_by, uploaded,uploaded_at}
        const {indexnumber,site_day_lot} = req.body;
        let n = 1;
        Transaction.findOne({
            attributes: ['recordid'],
            order: [['recordid', 'DESC' ]],
            raw: true,
            limit:1
        })
        .then(datas =>{
            const rayon = datas.recordid
            const rayons = Number(rayon)
            for(var x = 0; x < indexnumber; x++ ){
                const record = rayons+n
                // get __kp_logs
                function genRandonString(length) {var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                var charLength = chars.length;var result = ''; 
                for ( var i = 0; i < length; i++ ) { result += chars.charAt(Math.floor(Math.random() * charLength));}
                return result;}
                function genString(length) {var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                var charLength = chars.length;var result = '';
                for ( var i = 0; i < length; i++ ) {result += chars.charAt(Math.floor(Math.random() * charLength));}
                return result;}
                function genSring(length) {var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                var charLength = chars.length;var result = '';
                for ( var i = 0; i < length; i++ ) {result += chars.charAt(Math.floor(Math.random() * charLength));}
                return result;
                }
                function gentring(length) {var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
                var charLength = chars.length;var result = '';
                for ( var i = 0; i < length; i++ ) {result += chars.charAt(Math.floor(Math.random() * charLength));}
                return result;}
                function genRring(length) {var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                var charLength = chars.length;var result = '';
                for ( var i = 0; i < length; i++ ) {result += chars.charAt(Math.floor(Math.random() * charLength));}
                return result;}
                function genInteger(length) {var chars = '0123456789';var charLength = chars.length;var result = '';
                for ( var i = 0; i < length; i++ ) {result += chars.charAt(Math.floor(Math.random() * charLength));}
                return result;
                }
                var dat = '-'
                var res = genRring(8)
                var resu = genString(4)
                var resul = genSring(4)
                var reuds = gentring(4)
                var resue = genRandonString(12)
                var logs = res+dat+resu+dat+resul+dat+reuds+dat+resue
                var recordID = genInteger(7)
                var uploaded = 1
                var uploaded_at = format
                var approved_by = user
                var approved = 1
                var approved_at = format
                console.log(logs);
                console.log(record)
                console.log(uploaded_at)
                console.log(approved_by)
                console.log(approved)
                Transaction.update({__kp_Log:logs, recordid:record, approved:1, 
                    approved_at:format, approved_by:user, uploaded:1,uploaded_at:format
                }, {where:{site_day_lot:site_day_lot,status:0}})
                .then(inserted =>{
                   console.log('Done!');
                })
                n++;
            }
            
        })
        Lot_data.update({status:0},{where:{site_day_lot:site_day_lot}})
        .then(updated =>{
            req.flash('success', 'Additional Info Saved Successfuly!');
            res.redirect(`/rtc22?SCID=${site_day_lot}`)
        })  
    }
    if(action == 'delete_transation'){
        const {day_lot,trans_id} = req.body;
        Transaction.update({status:1},{where:{id:trans_id,site_day_lot:day_lot}})
        .then(deleted =>{
            req.flash('success', 'Deleted Successfuly!');
            res.redirect(`/rtc22?SCID=${day_lot}`);
        })
        .catch(err =>{ console.log(err); })
    }  
    if(action == 'save_bucket'){
        const {bucket_a,bucket_b,bucket_c,day_lot,certified} = req.body;
        if(certified == 1){cert = 'Certified';sts = 0;
        }else{cert = 'Uncertified';sts = 1;}
        Bucket.findAndCountAll({where:{day_lot_number:day_lot}})
        .then(data =>{
            const {row,count} = data
            if(count > 0){
                const col = {created_at:format,created_by:user,
                    bucketA:bucket_a,bucketB:bucket_b,bucketC:bucket_c,status:sts,certification:cert};
                Bucket.update(col,{where:{day_lot_number:day_lot}})
                .then(bucket =>{
                    req.flash('error', 'bucketing updated successfully!!!');
                    return res.redirect('/rtc23')
                })
            }else{
                Bucket.create({created_at:format,created_by:user,
                    _kf_Supplier:supplier,_kf_Station:station,_kf_Season:season,day_lot_number:day_lot,
                    bucketA:bucket_a,bucketB:bucket_b,bucketC:bucket_c,status:sts,certification:cert
                })
                .then(bucket =>{
                    req.flash('error', 'bucketing inserted successfully!!!');
                    return res.redirect('/rtc23')
                })
            }
        })  
    }
    if(action == 'save_bucket_weight'){
        let gradeCTaken = 0;
        let gradeBTaken = 0;
        let gradeATaken = 0;
        let TakenX = 0;
        const {taken_c,grade_c,taken_b,grade_b,taken_a,grade_a,day_lot,certified} = req.body;
        if((taken_a == 'before') || (taken_b == 'before') || (taken_c =='before')){
            TakenX = 0.55
        }else{ TakenX = 0.45 }
        gradeATaken = grade_a - (1.2*(TakenX - 0.12) * grade_a);
        gradeBTaken = grade_b - (1.2*(TakenX - 0.12) * grade_b);
        gradeCTaken = grade_c - (1.2*(TakenX - 0.12) * grade_c);
        if(certified == 1){ cert = 'Certified'; sts = 0;
        }else{ cert = 'Uncertified'; sts = 1;}
        Drying.findAndCountAll({where:{day_lot_number:day_lot}})
        .then(dry_bucket =>{
            const { count,rows } = dry_bucket;
            const col = {created_at:format,certification:cert,GradeA:grade_a,GradeB:grade_b,
                GradeC:grade_c,status:sts,outturn:0,moistureA:0,moistureB:0,moistureC:0,
                gradeATaken:taken_a,gradeBTaken:taken_b,gradeCTaken:taken_c,
                FinalGradeA:gradeATaken,FinalGradeB:gradeBTaken,FinalGradeC:gradeCTaken};
            if(count > 0){
                Drying.update(col,{where:{day_lot_number:day_lot}})
                .then(upds =>{
                    req.flash('error', 'The weight grade updated successfully!!!');
                    return res.redirect('/rtc23')
                }).catch(err =>{console.log(err);})
            }else{
                Drying.create({created_at:format,certification:cert,day_lot_number:day_lot,
                    GradeA:grade_a,GradeB:grade_b,GradeC:grade_c,status:sts,outturn:0,
                    moistureA:0,moistureB:0,moistureC:0,gradeATaken:taken_a,gradeBTaken:taken_b,
                    gradeCTaken:taken_c,FinalGradeA:gradeATaken,FinalGradeB:gradeBTaken,FinalGradeC:gradeCTaken
                }).then(upds =>{
                    req.flash('error', 'The weight grade added successfully!!!');
                    return res.redirect('/rtc23')
                }).catch(err =>{console.log(err);})
            }
        })
    }
};
// ====== get cws daily journal data =====
exports.getCWSDailyJournal = (req, res, next) =>{
    let message = req.flash('error');
    if(message.length > 0) { message = message[0]; }
    else { message = null; }
    let action = req.query.action;
    const user = req.session.user.id;
    const station = req.session.staff._kf_Station;
    const season = req.session.season.__kp_Season;
    const supplier = req.session.staff._kf_Supplier;
    const CHLOTID = req.query.CHLID;
    const CloseAndSend = req.query.CloseAndSubmit;
    if(action == 'cherry_lot'){
        var sql =`SELECT *,SUM(rtc_transactions.kilograms) as kilo,
        SUM(rtc_transactions.cash_paid) as cash, rtc_station.Name as station_name,
        COUNT(rtc_transactions.farmername) as contribution
        FROM rtc_transactions,rtc_users,rtc_station,staff 
        WHERE  rtc_transactions.status = 0
        AND rtc_transactions.username = rtc_users.Name_User
        AND rtc_users.__kp_User = staff._kf_User
        AND rtc_transactions._kf_Station = rtc_station.__kp_Station
        AND rtc_transactions._kf_Station ='${station}'
        AND rtc_transactions.cherry_lot_id = '${CHLOTID}'
        AND rtc_transactions._kf_Season ='${season}'
        GROUP BY rtc_transactions.cherry_lot_id,rtc_transactions.site_day_lot`
        sequelize.query(sql,{ type: Sequelize.QueryTypes.SELECT })
        .then(chlotID =>{
            return res.render('files/cherry_lot_details',{
                session_data: req.session.user,
                session_season: req.session.season,
                role: req.session.staff,
                access: req.session.access,
                modude_session: req.session.module,
                pageTitle: 'RTC - Dashboard',
                path: '/rtc23',
                errorMessage: message,
                isAuthenticated:req.session.isLoggedIn,
                data:chlotID
            }) 
        })
    }
    else if(action == 'close_lot'){
        console.log(season);
        console.log(CloseAndSend);
        Transaction.findAndCountAll({where:{fm_approval:0, cherry_lot_id:CloseAndSend,status:0 }})
        .then(counts =>{
            const { count,rows } = counts;
            if(count > 0){
                // rows.forEach((row) => {
                //     const staff = row._kf_Staff 
                //     const Station = row._kf_Station 
                //     const Season = row._kf_Season 
                //     const Supplier = row._kf_Supplier 
                //     const Price = row.unitprice 
                //     let cert = row.certification 
                //     const cherry_category = '8523EB72-0424-4289-B904-2505B9AE3A3C';
                //     switch(cert){
                //         case 'CP':
                //             cert = 'Cafe Practices';
                //             break;
                //        case 'RF':
                //             cert = 'RainForest';
                //            break;
                //        default:
                //             cert = 'Not certified';
                //            break;
                //     }
                //     console.log(staff);
                //     console.log(cert);
                //     console.log(Station);
                //     console.log(Season);
                //     console.log(Supplier);
                //     console.log(Price);

                //   });
                res.redirect('/api_transaction' + JSON.stringify(rows));
            }else{
                req.flash('error', 'This request has been blocked. Because the supplier is not allowed to transact with RTC!');
                res.redirect(`/rtc23?action=cherry_lot&&CHLID=${CloseAndSend}`)
            }
        })
    }
    
    
    else{
        var sql =`SELECT *,sum(rtc_transactions.kilograms) as kilo,
        sum(rtc_transactions.bad_kilograms) as floater,
        bucketing.day_lot_number as lot_bucket,drying.day_lot_number as lot_dry
        FROM rtc_transactions,rtc_station,bucketing,drying
        WHERE rtc_transactions._kf_Station = '${station}'
        AND rtc_transactions._kf_Station = rtc_station.__kp_Station
        AND rtc_transactions.status = 0
        AND rtc_transactions._kf_Season ='${season}' 
        GROUP BY rtc_transactions.cherry_lot_id
        ORDER BY rtc_transactions.transaction_date DESC`
        sequelize.query(sql,{ type: Sequelize.QueryTypes.SELECT })
        .then(resul =>{
            res.render('files/cws_daily_journal',{
                session_data: req.session.user,
                session_season: req.session.season,
                role: req.session.staff,
                access: req.session.access,
                modude_session: req.session.module,
                pageTitle: 'RTC - Dashboard',
                path: '/rtc23',
                errorMessage: message,
                isAuthenticated:req.session.isLoggedIn,
                data:resul
            })
        }).catch(err =>{console.log(err);})
    }  
}
// ====== get site collector details the information(SC daily journal) =====
exports.Search_CWS_Details = (req, res, next) =>{
    const search = req.query.search;
    const from = req.query.from;
    const to = req.query.to;
    const station = req.session.staff._kf_Station;
    const season = req.session.season.__kp_Season;
    var sql = '';
    sql = `SELECT *,sum(distinct rtc_transactions.kilograms) as kilo,
    sum(distinct rtc_transactions.bad_kilograms) as floater
    FROM rtc_transactions,rtc_station 
    WHERE rtc_transactions._kf_Station = rtc_station.__kp_Station 
    AND rtc_station.__kp_Station = '${station}'
    AND rtc_transactions.status = 0
    AND rtc_transactions._kf_Season ='${season}'
    GROUP BY rtc_transactions.transaction_date,
    rtc_transactions.DayLotNumber`;
    sequelize.query(sql,{ type: Sequelize.QueryTypes.SELECT })
    .then(results =>{
        if(search == ''){
            res.send(results);
        }else{
            sql = `SELECT *,sum(distinct rtc_transactions.kilograms) as kilo,
            sum(distinct rtc_transactions.bad_kilograms) as floater
            FROM rtc_transactions,rtc_station 
            WHERE rtc_transactions._kf_Station = rtc_station.__kp_Station 
            AND rtc_station.__kp_Station = '${station}'
            AND rtc_transactions.status = 0
            AND rtc_transactions._kf_Season ='${season}'
            AND rtc_transactions.cherry_lot_id LIKE '%${search}%'
            OR rtc_transactions.transaction_date BETWEEN '%${from}%' AND '%${to}%'
            GROUP BY rtc_transactions.transaction_date,rtc_transactions.DayLotNumber  `;
            sequelize.query(sql,{ type: Sequelize.QueryTypes.SELECT })
            .then(results =>{
                res.send(results);
            }).catch(err =>{console.log(err);})    
        }
        
    }).catch(err =>{console.log(err);})
    
    
};