import React, { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export default function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ nome: '', email: '' })

  async function loadUsers() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/users`)
      const data = await res.json()
      setUsers(data)
    } catch (e) {
      setError('Falha ao carregar usuários')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.nome || !form.email) {
      setError('Preencha nome e email')
      return
    }
    try {
      const res = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || 'Erro no cadastro')
      }
      setForm({ nome: '', email: '' })
      await loadUsers()
    } catch (e) {
      setError(e.message)
    }
  }

  async function handleDelete(id) {
    setError('')
    try {
      const res = await fetch(`${API_URL}/api/users/${id}`, { method: 'DELETE' })
      if (!res.ok && res.status !== 204) throw new Error('Erro ao excluir')
      await loadUsers()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: 24, fontFamily: 'system-ui, Arial' }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Cadastro de Usuários</h1>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginBottom: 24 }}>
        <input
          placeholder="Nome"
          value={form.nome}
          onChange={e => setForm({ ...form, nome: e.target.value })}
          style={{ padding: 10, fontSize: 16 }}
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          style={{ padding: 10, fontSize: 16 }}
        />
        <button type="submit" style={{ padding: '10px 16px', fontSize: 16, cursor: 'pointer' }}>Cadastrar</button>
      </form>

      {error && (
        <div style={{ background: '#fee2e2', color: '#991b1b', padding: 12, borderRadius: 6, marginBottom: 16 }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <h2 style={{ margin: 0, fontSize: 22 }}>Usuários</h2>
        <button onClick={loadUsers} style={{ padding: '6px 10px', cursor: 'pointer' }}>Atualizar</button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : users.length === 0 ? (
        <p>Nenhum usuário cadastrado.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 8 }}>
          {users.map(u => (
            <li key={u.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #e5e7eb', padding: 12, borderRadius: 8 }}>
              <div>
                <div style={{ fontWeight: 600 }}>{u.nome}</div>
                <div style={{ color: '#6b7280' }}>{u.email}</div>
              </div>
              <button onClick={() => handleDelete(u.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}>Excluir</button>
            </li>
          ))}
        </ul>
      )}

      <p style={{ marginTop: 24, color: '#6b7280' }}>API: {API_URL}</p>
    </div>
  )
}
