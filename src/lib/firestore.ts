import {
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  query,
  orderBy,
  limit,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import type { Review } from '../types'

const REVIEWS_COLLECTION = 'reviews'
const MAX_REVIEWS = 20

export interface FirestoreReview {
  id?: string
  bandName: string
  content: string
  createdAt: Timestamp
}

/**
 * Add new review to Firestore
 */
export async function addReview(review: Omit<Review, 'id' | 'timestamp'>): Promise<string> {
  const reviewData: Omit<FirestoreReview, 'id'> = {
    bandName: review.bandName,
    content: review.content,
    createdAt: Timestamp.now()
  }

  const docRef = await addDoc(collection(db, REVIEWS_COLLECTION), reviewData)
  return docRef.id
}

/**
 * Get recent reviews from Firestore
 */
export async function getRecentReviews(): Promise<Review[]> {
  const q = query(
    collection(db, REVIEWS_COLLECTION),
    orderBy('createdAt', 'desc'),
    limit(MAX_REVIEWS)
  )

  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map(doc => {
    const data = doc.data() as FirestoreReview
    return {
      id: doc.id,
      bandName: data.bandName,
      content: data.content,
      timestamp: data.createdAt.toMillis()
    } as Review
  })
}

/**
 * Get a single review by ID
 */
export async function getReviewById(reviewId: string): Promise<Review | null> {
  const docRef = doc(db, REVIEWS_COLLECTION, reviewId)
  const docSnap = await getDoc(docRef)

  if (!docSnap.exists()) {
    return null
  }

  const data = docSnap.data() as FirestoreReview
  return {
    id: docSnap.id,
    bandName: data.bandName,
    content: data.content,
    timestamp: data.createdAt.toMillis()
  } as Review
}
