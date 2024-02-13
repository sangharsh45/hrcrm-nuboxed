import { combineReducers } from "redux";
import { LOGOUT } from "../Containers/Auth/AuthTypes";
/**
 *  All of application reducers import goes here...
 */
import { authReducer } from "../Containers/Auth/AuthReducer";
import { brandmodelReducer } from "../Containers/Settings/Category/Brand&Model/BrandModelReducer";
import { pitchReducer } from "../Containers/Pitch/PitchReducer";
import { messageReducer } from "../Containers/LiveMessages/MessageReducer";
import { dashboardReducer } from "../Containers/Dashboard/DashboardReducer";
import { plannerReducer } from "../Containers/Planner/PlannerReducer";
import { settingsReducer } from "../Containers/Settings/SettingsReducer";
import { refurbishReducer } from "../Containers/Main/Refurbish/RefurbishReducer";
import { themeReducer } from "../Containers/Settings/Theme/ThemeReducer";

import { ruleReducer } from "../Containers/Rules/RulesReducer";
import { websitesReducer } from "../Containers/Organization/Child/Website/WebsiteReducer";

import { notificationReducer } from "../Containers/Notification/NotificationReducer";

import { profileReducer } from "../Containers/Profile/ProfileReducer";
import { expenseReducer } from "../Containers/Expense/ExpenseReducer";
import { rolesReducer } from "../Containers/Settings/Category/Role/RoleReducer";
import { educationsReducer } from "../Containers/Settings/Educations/EducationReducer";
import { functionsReducer } from "../Containers/Settings/Function/FunctionsReducer";
import { expensesReducer } from "../Containers/Settings/Expense/ExpensesReducer";
import { EmployeeReducer } from "../Containers/Employees/EmployeeReducer";
import { EventReducer } from "../Containers/Event/EventReducer";
import { TaskReducer } from "../Containers/Task/TaskReducer";
import { callReducer } from "../Containers/Call/CallReducer";
import { LeavesReducer } from "../Containers/Leave/LeavesReducer";
import { holidayReducer } from "../Containers/Holiday/HolidayReducer";
import { mileageReducer } from "../Containers/Mileage/MileageReducer";
import { reportReducer } from "../Containers/Reports/ReportReducer";
import { emailReducer } from "../Containers/Organization/Child/Email/EmailReducer";
import { ProjectReducer } from "../Containers/Project/ProjectReducer";
import { documentsReducer } from "../Containers/Settings/Documents/DocumentsReducer";
import { contactReducer } from "../Containers/Contact/ContactReducer";
import { customerReducer } from "../Containers/Customer/CustomerReducer";
import { OpportunityReducer } from "../Containers/Opportunity/OpportunityReducer";
import { candidateReducer } from "../Containers/Candidate/CandidateReducer";
import { languageReducer } from "../Language/LanguageReducer";
import { partnerReducer } from "../Containers/Partner/PartnerReducer";
import { sectorsReducer } from "../Containers/Settings/Sectors/SectorsReducer";
import { PermissionsReducer } from "../Containers/Permissions/PermissionsReducer";
import { designationsReducer } from "../Containers/Settings/Designation/DesignationReducer";
import { departmentsReducer } from "../Containers/Settings/Department/DepartmentReducer";
import { eventsReducer } from "../Containers/Settings/Event/EventReducer";
import { tasksReducer } from "../Containers/Settings/Task/TaskReducer";
import { librarysReducer } from "../Containers/Settings/Library/LibraryReducer";
import { importReducer } from "../Containers/Import/ImportReducer";
import { requirementReducer } from "../Containers/Requirement/RequirementReducer";
import { publishReducer } from "../Containers/Publish/PublishReducer";
import { idProofsReducer } from "../Containers/Settings/Id Proof/IdProofReducer";
import { accessmentReducer } from "../Containers/Accessment/AccessmentReducer";
import { leadsReducer } from "../Containers/Leads/LeadsReducer";
import { certificationReducer } from "../Containers/Settings/Recruitement/Child/Certification/CertificationReducer";
import { courseReducer } from "../Containers/Course/CourseReducer";
import { billingReducer } from "../Components/Billing/BillingReducer";
import { levelsReducer } from "../Containers/Settings/Recruitement/Level/LevelReducer";
import { streamsReducer } from "../Containers/Settings/Category/Assessment/Stream/StreamReducer";
import { unitsReducer } from "../Containers/Settings/Unit/UnitReducer";
import { programsReducer } from "../Containers/Program/ProgramReducer";
import { countryReducer } from "../Containers/Settings/Category/Country/CountryReducer";
import { projectsReducer } from "../Containers/Projects/ProjectsReducer";
import { invoiceReducer } from "../Containers/Invoice/InvoiceReducer";
import { locationReducer } from "../Containers/Event/Child/Location/LocationReducer";
import { sourceReducer } from "../Containers/Settings/Category/Source/SourceReducer";
import { investorReducer } from "../Containers/Investor/InvestorReducer";
import { contactInvestReducer } from "../Containers/ContactInvest/ContactInvestReducer";
import { dealReducer } from "../Containers/Deal/DealReducer";
import { suppliesReducer } from "../Containers/Main/Supplies/SuppliesReducer";
import { shipperReducer } from "../Containers/Main/Shipper/ShipperReducer";
import { plantReducer } from "../Containers/Plant/PlantReducer";
import { teamsReducer } from "../Containers/Main/Teams/TeamsReducer";
import { inventoryReducer } from "../Containers/Main/Inventory/InventoryReducer";
import { orderReducer } from "../Containers/Main/Order/OrderReducer";
import { shipByReducer } from "../Containers/Settings/Category/ShipBy/ShipByReducer";
import { catgCustomerReducer } from "../Containers/Settings/Category/Customer/CustomerReducer";
import { distributorReducer } from "../Containers/Main/Account/AccountReducer";
import { suppliersReducer } from "../Containers/Main/Suppliers/SuppliersReducer";
import { collectionReducer } from "../Containers/Collection/CollectionReducer";
import { productReducer } from "../Containers/Product/ProductReducer";
import { investorListReducer } from "../Containers/Settings/Category/InvestorTab/InvestorListReducer";
import { procurementReducer } from "../Containers/Procurement/ProcurementReducer";
import { catgPaymentReducer } from "../Containers/Settings/Category/Payment/PaymentReducer";
import { itemTaskReducer } from "../Containers/Settings/Category/ItemTask/ItemTaskReducer";
import { moduleReducer } from "../Containers/Settings/Category/Module/ModuleReducer";
import { kpiReducer } from "../Containers/Settings/Category/KPI/KPIReducer";
import { currencyReducer } from "../Containers/Settings/Category/Currency/CurrencyReducer";


const appReducer = combineReducers({
  dashboard: dashboardReducer,
  profile: profileReducer,
  partner: partnerReducer,
  auth: authReducer,
  call: callReducer,
  planner: plannerReducer,
  settings: settingsReducer,
  task: TaskReducer,
  theme: themeReducer,
  leave: LeavesReducer,
  holiday: holidayReducer,
  report: reportReducer,
  course: courseReducer,
  notification: notificationReducer,
  rule: ruleReducer,
  employee: EmployeeReducer,
  email: emailReducer,
  billings: billingReducer,
  event: EventReducer,
  expense: expenseReducer,
  location: locationReducer,
  role: rolesReducer,
  mileage: mileageReducer,
  project: ProjectReducer,
  document: documentsReducer,
  contact: contactReducer,
  customer: customerReducer,
  opportunity: OpportunityReducer,
  candidate: candidateReducer,
  language: languageReducer,
  pitch: pitchReducer,
  sector: sectorsReducer,
  education: educationsReducer,
  functions: functionsReducer,
  expenses: expensesReducer,
  permissions: PermissionsReducer,
  designations: designationsReducer,
  certifications: certificationReducer,
  departments: departmentsReducer,
  events: eventsReducer,
  tasks: tasksReducer,
  websites: websitesReducer,
  librarys: librarysReducer,
  importReducer: importReducer,
  requirement: requirementReducer,
  publish: publishReducer,
  idProof: idProofsReducer,
  message: messageReducer,
  assessment: accessmentReducer,
  leads: leadsReducer,
  level: levelsReducer,
  stream: streamsReducer,
  brandmodel: brandmodelReducer,
  unit: unitsReducer,
  program: programsReducer,
  countrys: countryReducer,
  projects: projectsReducer,
  invoice: invoiceReducer,
  source: sourceReducer,
  investor: investorReducer,
  contactinvest: contactInvestReducer,
  deal: dealReducer,
  supplies: suppliesReducer,
  shipper: shipperReducer,
  plant: plantReducer,
  teams: teamsReducer,
  inventory: inventoryReducer,
  order: orderReducer,
  shipBy: shipByReducer,
  catgCustomer: catgCustomerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    sessionStorage.clear();
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
