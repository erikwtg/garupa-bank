export class AccountEntity {
  id?: number
  userId: number
  accountNumber?: number 
  agencyNumber?: number 
  bankCode?: number 
  balance?: number
  createdAt?: string
  updatedAt?: string

  constructor({
    id,
    userId,
    accountNumber,
    agencyNumber,
    bankCode,
    balance,
    createdAt,
    updatedAt,
  }: {
    id?: number
    userId: number
    accountNumber?: number 
    agencyNumber?: number 
    bankCode?: number 
    balance?: number
    createdAt?: string
    updatedAt?: string
  }) {
    this.id = id
    this.userId = userId
    this.accountNumber = accountNumber
    this.agencyNumber = agencyNumber
    this.bankCode = bankCode
    this.balance = balance
    this.createdAt = createdAt
    this.updatedAt = updatedAt
  }
}
