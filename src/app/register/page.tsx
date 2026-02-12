'use client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useState } from 'react'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState('user') // Rolul implicit
  const supabase = createClientComponentClient()

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Trimitem datele către Trigger-ul din Supabase pe care l-ai creat
        data: {
          full_name: fullName,
          rol: role
        }
      }
    })

    if (error) alert(error.message)
    else alert('Verifică email-ul pentru confirmare!')
  }

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-20 p-8 bg-gray-900 rounded-xl text-white">
      <h1 className="text-2xl font-bold">Creează Cont</h1>
      
      <input type="text" placeholder="Nume Complet" className="p-2 bg-gray-800 rounded" 
        onChange={(e) => setFullName(e.target.value)} />
      
      <input type="email" placeholder="Email" className="p-2 bg-gray-800 rounded" 
        onChange={(e) => setEmail(e.target.value)} />
      
      <input type="password" placeholder="Parolă" className="p-2 bg-gray-800 rounded" 
        onChange={(e) => setPassword(e.target.value)} />

      <label>Cine ești?</label>
      <select className="p-2 bg-gray-800 rounded text-white" value={role} 
        onChange={(e) => setRole(e.target.value)}>
        <option value="user">Utilizator Simplu</option>
        <option value="breeder">Crescător (Breeder)</option>
        <option value="vet">Cabinet Veterinar</option>
        <option value="shop">Pet Shop</option>
        <option value="trainer">Dresor</option>
      </select>

      <button onClick={handleSignUp} className="bg-blue-600 p-2 rounded font-bold hover:bg-blue-700">
        Înregistrare
      </button>
    </div>
  )
}