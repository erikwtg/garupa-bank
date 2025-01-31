export class TransferEntity {
  id?: number
  externalId?: string
  amount?: number
  expectedOn?: Date
  status?: string
  transactionType?: string
  transferMethod?: string
  accountHolder?: string  // Tornar obrigatório após implementar
  accountNumber?: string  // Tornar obrigatório após implementar
  agencyNumber?: string  // Tornar obrigatório após implementar
  bankCode?: string // Tornar obrigatório após implementar
  beneficiaryAccountHolder?: string // Tornar obrigatório após implementar
  beneficiaryAccountNumber?: string // Tornar obrigatório após implementar
  beneficiaryAgencyNumber?: string // Tornar obrigatório após implementar
  beneficiaryBankCode?: string // Tornar obrigatório após implementar
  transactionDescription?: string

  constructor({
    id,
    externalId,
    amount,
    expectedOn,
    status = 'pending',
    transactionType,
    transferMethod,
    accountHolder,  
    accountNumber,  
    agencyNumber,  
    bankCode,
    beneficiaryAccountHolder,  
    beneficiaryAccountNumber,  
    beneficiaryAgencyNumber,  
    beneficiaryBankCode,
    transactionDescription,
  }: {
    id?: number
    externalId?: string
    amount?: number
    expectedOn?: Date
    status?: string
    transactionType?: string
    transferMethod?: string
    accountHolder?: string  // Tornar obrigatório após implementar
    accountNumber?: string  // Tornar obrigatório após implementar
    agencyNumber?: string  // Tornar obrigatório após implementar
    bankCode?: string // Tornar obrigatório após implementar
    beneficiaryAccountHolder?: string  // Tornar obrigatório após implementar
    beneficiaryAccountNumber?: string  // Tornar obrigatório após implementar
    beneficiaryAgencyNumber?: string  // Tornar obrigatório após implementar
    beneficiaryBankCode?: string // Tornar obrigatório após implementar
    transactionDescription?: string
  }) {
    this.id = id
    this.externalId = externalId
    this.amount = amount
    this.expectedOn = expectedOn
    this.status = status
    this.transactionType = transactionType
    this.transferMethod = transferMethod
    this.accountHolder = accountHolder  
    this.accountNumber = accountNumber  
    this.agencyNumber = agencyNumber  
    this.bankCode = bankCode
    this.beneficiaryAccountHolder = beneficiaryAccountHolder  
    this.beneficiaryAccountNumber = beneficiaryAccountNumber  
    this.beneficiaryAgencyNumber = beneficiaryAgencyNumber  
    this.beneficiaryBankCode = beneficiaryBankCode
    this.transactionDescription = transactionDescription
  }
}
