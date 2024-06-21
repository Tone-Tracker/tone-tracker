import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { collection, addDoc } from 'firebase/firestore'
import { useFirestore } from 'vuefire'

const db = useFirestore()

export const useChat = defineStore('chat', () => {
  
  async function sendMessage(payload) {
    console.log('payload', payload)
    const newDoc = await addDoc(collection(db, 'messages'), {
      ...newProduct.value,
    }).then(doc=> {
      console.log('doc', doc)
    })
  
    if (newDoc.id) {
      router.push('/')
    }
  }

  return { sendMessage }
})
