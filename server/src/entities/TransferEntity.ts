import { TRANSACTION_STATUS } from "../constants/transactionStatus.ts"

export class TransferEntity {
  id?: number
  externalId?: string
  orderId?: string
  accountId: number
  amount: number
  expectedOn?: Date
  dueDate?: Date
  status?: string
  transactionType: string
  transferMethod?: string
  beneficiaryAccountHolder?: string
  beneficiaryAccountNumber?: number
  beneficiaryAgencyNumber?: number
  beneficiaryBankCode?: number
  transactionDescription?: string

  constructor({
    id,
    externalId,
    orderId,
    accountId,
    amount,
    expectedOn,
    dueDate,
    status = TRANSACTION_STATUS.PENDING,
    transactionType,
    transferMethod,
    beneficiaryAccountHolder,  
    beneficiaryAccountNumber,  
    beneficiaryAgencyNumber,  
    beneficiaryBankCode,
    transactionDescription,
  }: {
    id?: number
    externalId?: string
    orderId?: string
    accountId: number
    amount: number
    expectedOn?: Date
    dueDate?: Date
    status?: string
    transactionType: string
    transferMethod?: string
    beneficiaryAccountHolder?: string
    beneficiaryAccountNumber?: number
    beneficiaryAgencyNumber?: number
    beneficiaryBankCode?: number
    transactionDescription?: string
  }) {
    this.id = id
    this.externalId = externalId
    this.orderId = orderId
    this.accountId = accountId
    this.amount = amount
    this.expectedOn = expectedOn
    this.dueDate = dueDate
    this.status = status
    this.transactionType = transactionType
    this.transferMethod = transferMethod
    this.beneficiaryAccountHolder = beneficiaryAccountHolder  
    this.beneficiaryAccountNumber = beneficiaryAccountNumber  
    this.beneficiaryAgencyNumber = beneficiaryAgencyNumber  
    this.beneficiaryBankCode = beneficiaryBankCode
    this.transactionDescription = transactionDescription
  }
}
