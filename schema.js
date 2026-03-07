// ============================================================
// MARSHALL — SCHÉMA FIREBASE FIRESTORE
// ============================================================
//
// Collection: users
// Document ID: uid (Firebase Auth UID)
// {
//   uid: string,
//   email: string,
//   pseudo: string,           // unique, choisi à la 1ère connexion
//   role: "user" | "employee" | "admin",
//   createdAt: Timestamp,
//   characters: [             // sous-collection ou embedded (max 8)
//     {
//       id: string,
//       firstNameRP: string,
//       lastNameRP: string,
//       loyaltyCard: {
//         active: boolean,
//         points: number,
//         level: "bronze" | "silver" | "gold" | "platinum",
//         activatedAt: Timestamp | null,
//         activatedBy: string (employeeUid)
//       },
//       contracts: [
//         {
//           id: string,
//           contractId: string,    // ref vers contracts collection
//           status: "active" | "expired" | "cancelled",
//           activatedAt: Timestamp,
//           expiresAt: Timestamp,
//           durationMonths: number,
//           activatedBy: string (employeeUid)
//         }
//       ]
//     }
//   ]
// }
//
// Collection: characters (sous-collection de users)
// Path: users/{uid}/characters/{characterId}
// {
//   id: string,
//   firstNameRP: string,
//   lastNameRP: string,
//   loyaltyCard: { active, points, level, activatedAt, activatedBy },
//   contracts: Array<ContractInstance>,
//   orders: Array<OrderRef>,
//   createdAt: Timestamp
// }
//
// Collection: contracts
// Document ID: auto
// {
//   id: string,
//   name: string,
//   description: string,
//   priceMonthly: number,
//   benefits: string[],       // placeholders
//   discordLink: string,
//   active: boolean
// }
//
// Collection: shops
// Document ID: auto
// {
//   id: string,
//   name: string,
//   description: string,
//   location: string,
//   active: boolean,
//   createdAt: Timestamp
// }
//
// Collection: products
// Document ID: auto
// {
//   id: string,
//   name: string,
//   category: string,
//   description: string,
//   price: number,
//   imageUrl: string,
//   inStock: boolean
// }
//
// Collection: orders
// Document ID: auto
// {
//   id: string,
//   userUid: string,
//   characterId: string,
//   characterName: string,
//   type: "product" | "contract",
//   itemId: string,
//   itemName: string,
//   date: Timestamp,
//   status: "pending" | "completed" | "cancelled"
// }
//
// Collection: admins
// Document ID: email
// { email: string, uid: string, addedAt: Timestamp }
//
// Collection: employees
// Document ID: uid
// { uid: string, email: string, pseudo: string, addedAt: Timestamp, addedBy: string }
//
// ============================================================
