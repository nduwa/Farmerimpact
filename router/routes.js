const express = require('express');
const control = require('../controllers/rtc_system');
const api = require('../controllers/api_control');
const isAuth = require('../middleware/isAuth');
const router = express.Router();

//==== get the index (login) ===
router.get('/', control.getIndex);
router.get('/rtc11',isAuth, control.getHome);
router.get('/logout', control.getLogout);
router.get('/rtc12',isAuth, control.getUsers);
router.get('/rtc13',isAuth, control.getFarmers);
router.get('/rtc14',isAuth, control.getStationFarmers);
router.get('/rtc15',isAuth, control.getStationFarmers);
router.get('/rtc16',isAuth, control.getInspections);
router.get('/userAccess/:userID/:userStatus', isAuth, control.getUserAccess);
router.get('/rtc22', isAuth, control.getSCDailyJournals);
router.get('/search_sc_daily_journals', isAuth, control.getSearchedSCDailyJournals);
router.get('/rtc23',isAuth, control.getCWSDailyJournal);
router.get('/search_cws_details', isAuth, control.Search_CWS_Details);

// === post router
router.post('/login', control.postLogin);
router.post('/edit_user_password',isAuth, control.PostEditUserPassword);
router.post('/phone_modules',isAuth, control.PostPhoneModules);
router.post('/computer_modules',isAuth, control.PostComputerModules);
router.post('/mobile_control',isAuth, control.PostMobileControl);
router.post('/computer_control',isAuth, control.PostComputerControl);
router.post('/rtc22', isAuth, control.SaveTransactionChanges);


//=== get API Data ====
router.get('/api_user', api.getUsers);
router.get('/api_transaction', api.getTransaction);

router.get('/api_groups', api.getGroup);
router.get('/api_trainings', api.getTraining);
router.get('/api_stations', api.getStation);
router.get('/api_suppliers', api.getSuplier);

module.exports = router;