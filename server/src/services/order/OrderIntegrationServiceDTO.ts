export class OrderIntegrationServiceDTO {
  externalId?: string
  amount?: number
  transactionType?: string
  transferMethod?: string
  beneficiaryAccountHolder?: number // Tornar obrigatório após implementar
  beneficiaryAccountNumber?: number // Tornar obrigatório após implementar
  beneficiaryAgencyNumber?: number // Tornar obrigatório após implementar
  beneficiaryBankCode?: number // Tornar obrigatório após implementar

  constructor({
    externalId,
    amount,
    transactionType,
    transferMethod,
    beneficiaryAccountHolder,
    beneficiaryAccountNumber,
    beneficiaryAgencyNumber,
    beneficiaryBankCode,
  }: {
    externalId?: string,
    amount?: number,
    transactionType?: string,
    transferMethod?: string,
    beneficiaryAccountHolder?: number, // Tornar obrigatório após implementar
    beneficiaryAccountNumber?: number, // Tornar obrigatório após implementar
    beneficiaryAgencyNumber?: number, // Tornar obrigatório após implementar
    beneficiaryBankCode?: number, // Tornar obrigatório após implementar
  }) {
    this.externalId = externalId
    this.amount = amount
    this.transactionType = transactionType
    this.transferMethod = transferMethod
    this.beneficiaryAccountHolder = beneficiaryAccountHolder  
    this.beneficiaryAccountNumber = beneficiaryAccountNumber  
    this.beneficiaryAgencyNumber = beneficiaryAgencyNumber  
    this.beneficiaryBankCode = beneficiaryBankCode
  }
}