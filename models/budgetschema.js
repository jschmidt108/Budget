const mongoose = require('mongoose')
const Schema = mongoose.Schema

const budgetSchema = new Schema ({
  // basic info
  category: String,
  month: String,
  year: Number,

  // income
  income: Number,
  commissions: Number,
  bonus: Number,
  gifts: Number,
  otherIncome: Number,

  // home expenses
  mortgage: Number,
  rent: Number,
  utilities: Number,
  maintenance: Number,
  improvements: Number,
  otherHome: Number,

  // living expenses
  groceries: Number,
  laundry: Number,
  medical: Number,
  otherLiving: Number,

  // personal expenses
  dining: Number,
  salon: Number,
  clothing: Number,
  events: Number, 
  vacation: Number,
  otherPersonal: Number,

  // tech expenses
  phone: Number, 
  wifi: Number,
  cable: Number, 
  streaming: Number,
  otherTech: Number,

  // transportation
  car: Number,
  fuel: Number,
  public: Number,
  taxi: Number,
  otherTrans: Number,

  // health 
  insurance: Number, 
  pharmacy: Number,
  gym: Number,
  otherHealth: Number,
  
})

const budgetCollection = mongoose.model('Budget', budgetSchema)
module.exports = budgetCollection