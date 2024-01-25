import {
  collection,
  CollectionReference,
  deleteDoc,
  DocumentData,
  DocumentReference,
  FieldPath,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
  WhereFilterOp,
} from 'firebase/firestore'
import { doc, setDoc } from 'firebase/firestore'

import Booking from '../interfaces/Booking'
import CycleInterface from '../interfaces/Cycle'
import UserInterface from '../interfaces/User'

import { app } from './index'

const db = getFirestore(app)

class Document {
  ref: DocumentReference
  doc: DocumentData | null
  constructor(path: string, ...pathSegments: string[]) {
    this.ref = doc(db, path, ...pathSegments)
    this.doc = null
  }
  async get() {
    try {
      const doc = await getDoc(this.ref)
      if (doc.exists()) {
        this.doc = doc.data()
      }
    } catch (e) {
      console.error(e)
    }
    return this.doc
  }
  async update(newData: any) {
    try {
      await updateDoc(this.ref, newData)
      this.doc = { ...this.doc, ...newData }
    } catch (e) {
      console.error(e)
    }
    return this.doc
  }
  async set(newData: any) {
    try {
      await setDoc(this.ref, newData)
      this.doc = newData
    } catch (e) {
      console.error(e)
    }
    return this.doc
  }

  async delete() {
    try {
      await deleteDoc(this.ref)
      this.doc = null
    } catch (e) {
      console.error(e)
    }
    return this.doc
  }
}
class Collection {
  ref: CollectionReference
  constructor(path: string, ...pathSegments: string[]) {
    this.ref = collection(db, path, ...pathSegments)
  }
  async getAll() {
    try {
      const res = await getDocs(this.ref)
      return res.docs.map((doc) => doc.data())
    } catch (e) {
      console.error(e)
    }
    return []
  }
  async getQuery(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown) {
    try {
      const res = await getDocs(query(this.ref, where(fieldPath, opStr, value)))
      return res.docs.map((doc) => doc.data())
    } catch (e) {
      console.error(e)
    }
    return []
  }
  async deleteAll() {
    try {
      const res = await getDocs(this.ref)
      res.docs.forEach((doc) => deleteDoc(doc.ref))
    } catch (e) {
      console.error(e)
    }
    return []
  }

  async deleteQuery(fieldPath: string | FieldPath, opStr: WhereFilterOp, value: unknown) {
    try {
      const res = await getDocs(query(this.ref, where(fieldPath, opStr, value)))
      res.docs.forEach((doc) => deleteDoc(doc.ref))
    } catch (e) {
      console.error(e)
    }
    return []
  }

  async listenAll(callback: (newDocs: DocumentData[]) => void) {
    try {
      return onSnapshot(this.ref, (snapshot) => {
        callback(snapshot.docs.map((doc) => doc.data()))
      })
    } catch (e) {
      console.error(e)
    }
    return []
  }
  async listenQuery(
    fieldPath: string | FieldPath,
    opStr: WhereFilterOp,
    value: unknown,
    callback: (newDocs: DocumentData[]) => void
  ) {
    try {
      return onSnapshot(query(this.ref, where(fieldPath, opStr, value)), (snapshot) => {
        callback(snapshot.docs.map((doc) => doc.data()))
      })
    } catch (e) {
      console.error(e)
    }
    return []
  }
}
export async function createUser(email: string, name: string, image?: string) {
  const user = new Document('users', email)
  const data: UserInterface = {
    name,
    email,
    image,
  }
  return await user.set(data)
}
//getOne

export async function getUser(id: string): Promise<UserInterface> {
  const order = new Document('users', id)
  return (await order.get()) as UserInterface
}
//getAll

export async function createCycle(cycle: CycleInterface) {
  const user = new Document('cycle', cycle.id)
  return await user.set(cycle)
}
export async function deleteCycle(cycleId: string) {
  const user = new Document('cycle', cycleId)
  return await user.delete()
}
//getOne

export async function getCycle(id?: string): Promise<CycleInterface | null> {
  if (!id) return null
  const order = new Document('cycle', id)
  return (await order.get()) as CycleInterface
}
//getAll

export async function getCycles(): Promise<CycleInterface[]> {
  const orders = new Collection('cycle')
  return (await orders.getAll()) as CycleInterface[]
}
export async function getUserCycles(email: string): Promise<CycleInterface[]> {
  const orders = new Collection('cycle')
  return (await orders.getQuery('host', '==', email)) as CycleInterface[]
}
export async function createBooking(booking: Booking) {
  const _booking = new Document('booking', booking.id)
  return await _booking.set({
    ...booking,
    date: parseInt(booking.date.toString()),
    price: parseInt(booking.price.toString()),
  })
}
export async function getClientBookings(email: string): Promise<Booking[]> {
  const orders = new Collection('booking')
  return (await orders.getQuery('client', '==', email)) as Booking[]
}

export async function getCycleBookings(id: string): Promise<Booking[]> {
  const orders = new Collection('booking')
  return (await orders.getQuery('cycle', '==', id)) as Booking[]
}
export async function getHostBookings(email: string): Promise<Booking[]> {
  const orders = new Collection('booking')
  return (await orders.getQuery('host', '==', email)) as Booking[]
}
export async function updateCycle(cycleID: string, data: Partial<CycleInterface>) {
  const cycle = new Document('cycle', cycleID)
  return await cycle.update(data)
}
