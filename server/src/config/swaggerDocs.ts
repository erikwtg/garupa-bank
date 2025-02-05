export const transferDocs = {
  "/auth/register": {
    post: {
      summary: "Cria uma nova conta",
      description: "Endpoint para criar uma nova conta",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "name",
                "email",
                "password"
              ],
              properties: {
                name: {
                  type: "string",
                  example: "garupa"
                },
                email: {
                  type: "string",
                  format: "email",
                  example: "contato@garupa.com.br"
                },
                password: {
                  type: "string",
                  example: "garupa"
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Conta criada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2FydXBhQGdtYWlsLmNvbSIsImlhdCI6MTczODQ1MDQ3MywiZXhwIjoxNzM4NDU0MDczfQ.bJ61hER5CjmiPD4AD7jMUILSoQl-CpV18DUD1VODTlI"
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            example: 1
                          },
                          name: {
                            type: "string",
                            example: "garupa"
                          },
                          email: {
                            type: "string",
                            example: "contato@garupa.com.br"
                          }
                        }
                      }
                    }
                  },
                  message: {
                    type: "string",
                    example: "Usuário e conta criados com sucesso"
                  }
                }
              }
            }
          }
        },
        400: { description: "Erro na requisição (exemplo, campos inválidos)" },
        500: { description: "Erro interno do servidor" }
      }
    }
  },

  "/auth/login": {
    post: {
      summary: "Cria uma nova conta",
      description: "Endpoint para criar uma nova conta",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "email",
                "password"
              ],
              properties: {
                email: {
                  type: "string",
                  format: "email",
                  example: "contato@garupa.com.br"
                },
                password: {
                  type: "string",
                  example: "garupa"
                }
              }
            }
          }
        }
      },
      responses: {
        200: {
          description: "Login realizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  data: {
                    type: "object",
                    properties: {
                      token: {
                        type: "string",
                        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiZ2FydXBhQGdtYWlsLmNvbSIsImlhdCI6MTczODQ1MDQ3MywiZXhwIjoxNzM4NDU0MDczfQ.bJ61hER5CjmiPD4AD7jMUILSoQl-CpV18DUD1VODTlI"
                      },
                      user: {
                        type: "object",
                        properties: {
                          id: {
                            type: "number",
                            example: 1
                          },
                          name: {
                            type: "string",
                            example: "garupa"
                          },
                          email: {
                            type: "string",
                            example: "contato@garupa.com.br"
                          }
                        }
                      }
                    }
                  },
                  message: {
                    type: "string",
                    example: "Login realizado com sucesso"
                  }
                }
              }
            }
          }
        },
        400: { description: "Erro na requisição (exemplo, campos inválidos)" },
        500: { description: "Erro interno do servidor" }
      }
    }
  },

  "/account/:id": {
    get: {
      summary: "Lista informações da conta específica",
      description: "Endpoint para listar informações da conta específica",
      tags: ["Account"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID único da conta",
          schema: {
            type: "number",
            example: 1
          }
        }
      ],
      responses: {
        200: {
          description: "Login realizado com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 1
                    },
                    userId: {
                      type: "number",
                      example: 1
                    },
                    accountNumber: {
                      type: "number",
                      example: 365322
                    },
                    agencyNumber: {
                      type: "number",
                      example: 3439
                    },
                    bankCode: {
                      type: "number",
                      example: 240
                    },
                    balance: {
                      type: "number",
                      example: 1000000
                    },
                    createdAt: {
                      type: "datetime",
                      example: "2025-02-01T22:51:03.230Z"
                    },
                    updatedAt: {
                      type: "dateetime",
                      example: "2025-02-01T22:51:03.230Z"
                    },
                  },
                }
              },
            }
          }
        },
        400: { description: "Erro na requisição (exemplo, campos inválidos)" },
        500: { description: "Erro interno do servidor" }
      }
    }
  },

  "/transfers": {
    post: {
      summary: "Cria uma nova transação",
      description: "Endpoint para criar uma nova transação financeira entre contas.",
      tags: ["Transactions"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: [
                "accountId",
                "transactionType",
                "transferMethod",
                "amount",
                "beneficiaryAccountHolder",
                "beneficiaryAgencyNumber",
                "beneficiaryBankCode"
              ],
              properties: {
                id: {
                  type: "number",
                  example: 1
                },
                externalId: {
                  type: "string",
                  example: "IDEXTERNO12345"
                },
                amount: {
                  type: "number",
                  example: 100.50
                },
                expectedOn: {
                  type: "datetime",
                  example: "2025-02-01T22:55:57.102Z"
                },
                dueDate: {
                  type: "datetime",
                  example: "2025-02-01T22:55:57.102Z"
                },
                status: {
                  type: "string",
                  example: "processing"
                },
                accountId: {
                  type: "number",
                  example: 3
                },
                transactionType: {
                  type: "string",
                  enum: ["transfer"], example: "transfer"
                },
                transferMethod: {
                  type: "string",
                  enum: ["TED", "PIX"]
                },
                beneficiaryAccountHolder: {
                  type: "string",
                  example: "Beneficiado"
                },
                beneficiaryAccountNumber: {
                  type: "number",
                  example: 3
                },
                beneficiaryAgencyNumber: {
                  type: "number",
                  example: 3345678934565432
                },
                beneficiaryBankCode: {
                  type: "number",
                  example: 236
                },
                transactionDescription: {
                  type: "string",
                  example: "Descrição da transferência"
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Transação criada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  transactionId: {
                    type: "string",
                    example: "abc123"
                  },
                  message: {
                    type: "string",
                    example: "Transferência efetuada com sucesso"
                  }
                },
              },
            },
          },
        },
        400: { description: "Erro na requisição (exemplo, campos inválidos)" },
        500: { description: "Erro interno do servidor" },
      },
    },

    get: {
      summary: "Listar transações financeiras",
      description: "Endpoint para listar as transação financeira.",
      tags: ["Transactions"],
      responses: {
        200: {
          description: "Transação criada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "string",
                      example: 1
                    },
                    orderId: {
                      type: "string",
                      example: "23903d5f-3812-413b-9bf0-b96775ca80eb"
                    },
                    externalId: {
                      type: "string",
                      example: "IDEXTERNO12345"
                    },
                    amount: {
                      type: "number",
                      example: 100.50
                    },
                    expectedOn: {
                      type: "datetime",
                      example: "2025-02-01T22:55:57.102Z"
                    },
                    dueDate: {
                      type: "datetime",
                      example: "2025-02-01T22:55:57.102Z"
                    },
                    status: {
                      type: "string",
                      example: "processing"
                    },
                    accountId: {
                      type: "number",
                      example: 3
                    },
                    transactionType: {
                      type: "string",
                      enum: ["transfer"], example: "transfer"
                    },
                    transferMethod: {
                      type: "string",
                      enum: ["TED", "PIX"]
                    },
                    beneficiaryAccountHolder: {
                      type: "string",
                      example: "Beneficiado"
                    },
                    beneficiaryAccountNumber: {
                      type: "number",
                      example: 3
                    },
                    beneficiaryAgencyNumber: {
                      type: "number",
                      example: 3345678934565432
                    },
                    beneficiaryBankCode: {
                      type: "number",
                      example: 236
                    },
                    transactionDescription: {
                      type: "string",
                      example: "Descrição da transferência"
                    },
                    createdAt: {
                      type: "datetime",
                      example: "2025-02-01T22:51:03.230Z"
                    },
                    updatedAt: {
                      type: "dateetime",
                      example: "2025-02-01T22:51:03.230Z"
                    },
                  },
                }
              },
            },
          },
        },
        400: { description: "Erro na requisição (exemplo, campos inválidos)" },
        500: { description: "Erro interno do servidor" },
      },
    },
  },

  "/transfers/:id": {
    get: {
      summary: "Cria uma nova transação",
      description: "Endpoint para criar uma nova transação financeira entre contas.",
      tags: ["Transactions"],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          description: "ID único da transação",
          schema: {
            type: "number",
            example: 1
          }
        }
      ],
      responses: {
        200: {
          description: "Transação criada com sucesso",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: {
                      type: "number",
                      example: 1
                    },
                    externalId: {
                      type: "string",
                      example: "IDEXTERNO12345"
                    },
                    amount: {
                      type: "number",
                      example: 100.50
                    },
                    expectedOn: {
                      type: "datetime",
                      example: "2025-02-01T22:55:57.102Z"
                    },
                    dueDate: {
                      type: "datetime",
                      example: "2025-02-01T22:55:57.102Z"
                    },
                    status: {
                      type: "string",
                      example: "processing"
                    },
                    accountId: {
                      type: "number",
                      example: 3
                    },
                    transactionType: {
                      type: "string",
                      enum: ["transfer"], example: "transfer"
                    },
                    transferMethod: {
                      type: "string",
                      enum: ["TED", "PIX"]
                    },
                    beneficiaryAccountHolder: {
                      type: "string",
                      example: "Beneficiado"
                    },
                    beneficiaryAccountNumber: {
                      type: "number",
                      example: 3
                    },
                    beneficiaryAgencyNumber: {
                      type: "number",
                      example: 3345678934565432
                    },
                    beneficiaryBankCode: {
                      type: "number",
                      example: 236
                    },
                    transactionDescription: {
                      type: "string",
                      example: "Descrição da transferência"
                    },
                    createdAt: {
                      type: "datetime",
                      example: "2025-02-01T22:51:03.230Z"
                    },
                    updatedAt: {
                      type: "dateetime",
                      example: "2025-02-01T22:51:03.230Z"
                    },
                  },
                }
              },
            },
          },
        },
        400: { description: "Erro na requisição (exemplo, campos inválidos)" },
        500: { description: "Erro interno do servidor" },
      },
    },
  },
};
