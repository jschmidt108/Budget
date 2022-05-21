const mongoose = require('mongoose')
const Schema = mongoose.Schema

const budgetSchema = new Schema ({
  // basic info
  category: String,
  month: String,
  year: Number,

  // income
  income: {type:Number, default: 0},
  commissions: {type:Number, default: 0},
  bonus: {type:Number, default: 0},
  gifts: {type:Number, default: 0},
  otherIncome: {type:Number, default: 0},

  // home expenses
  mortgage: {type:Number, default: 0},
  rent: {type:Number, default: 0},
  utilities: {type:Number, default: 0},
  maintenance: {type:Number, default: 0},
  improvements: {type:Number, default: 0},
  otherHome: {type:Number, default: 0},

  // living expenses
  groceries: {type:Number, default: 0},
  laundry: {type:Number, default: 0},
  medical: {type:Number, default: 0},
  otherLiving: {type:Number, default: 0},

  // personal expenses
  dining: {type:Number, default: 0},
  salon: {type:Number, default: 0},
  clothing: {type:Number, default: 0},
  events: {type:Number, default: 0},
  vacation: {type:Number, default: 0},
  otherPersonal: {type:Number, default: 0},

  // tech expenses
  phone: {type:Number, default: 0},
  wifi: {type:Number, default: 0},
  cable: {type:Number, default: 0},
  streaming: {type:Number, default: 0},
  otherTech: {type:Number, default: 0},

  // transportation
  car: {type:Number, default: 0},
  fuel: {type:Number, default: 0},
  public: {type:Number, default: 0},
  taxi: {type:Number, default: 0},
  otherTrans: {type:Number, default: 0},

  // health 
  insurance: {type:Number, default: 0},
  pharmacy: {type:Number, default: 0},
  gym: {type:Number, default: 0},
  otherHealth: {type:Number, default: 0},
  
})

const budgetCollection = mongoose.model('Budget', budgetSchema)
module.exports = budgetCollection