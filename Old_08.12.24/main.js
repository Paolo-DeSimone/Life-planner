import Utilities from './Classes/Utilities.js';
import User from './Classes/User.js';
import Objective from './Classes/Objective.js';
import MonthSettings from './Classes/MonthSettings.js';

const utilities = new Utilities()
const user = new User()
const objective = new Objective()
const monthSettings = new MonthSettings()

//console.log("User.OBM in main.js:", User.OBM);

const FunctionsBarEBMtable = document.body.appendChild(utilities.CreateHTMLobj("FunctionsBar","EBMtable"))
const EBMtable = document.body.appendChild(utilities.CreateHTMLobj("EBMtable"))

const FunctionsBarOBMtable = document.body.appendChild(utilities.CreateHTMLobj("FunctionsBar","OBMtable"))
const OBMtable = document.body.appendChild(utilities.CreateHTMLobj("OBMtable"))
const OBMtimeline = document.body.appendChild(utilities.CreateHTMLobj("OBMtimeline"))
