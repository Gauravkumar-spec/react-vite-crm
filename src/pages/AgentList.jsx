import { useEffect, useState } from 'react';
import axios from 'axios';

function AgentList() {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [editingAgent, setEditingAgent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/agents');
      setAgents(res.data);
    } catch (err) {
      console.error('Failed to fetch agents:', err);
      setError('Failed to load agents. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/agents/${id}`);
      setAgents(agents.filter(agent => agent._id !== id));
    } catch (err) {
      console.error('Failed to delete agent:', err);
      setError('Failed to delete agent');
    }
  };

  const handleEdit = (agent) => {
    setEditingAgent(agent._id);
    setFormData({
      name: agent.name,
      email: agent.email,
      phone: agent.phone || ''
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      if (image) data.append('image', image);

      const res = await axios.put(
        `http://localhost:5000/api/agents/${editingAgent}`,
        data,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setAgents(agents.map(agent => 
        agent._id === editingAgent ? res.data : agent
      ));
      cancelEdit();
    } catch (err) {
      console.error('Failed to update agent:', err);
      setError('Failed to update agent');
    }
  };

  const cancelEdit = () => {
    setEditingAgent(null);
    setFormData({ name: '', email: '', phone: '' });
    setImage(null);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-flex">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 animate-spin"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-zinc-900 rounded-full"></div>
          </div>
          <p className="mt-4 text-lg text-zinc-300 font-light tracking-wider">LOADING NETWORK</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="bg-gradient-to-br from-red-900/40 to-red-800/30 border border-red-800/50 text-red-300 px-6 py-4 rounded-xl max-w-md mx-auto backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
          <button 
            onClick={() => setError(null)} 
            className="mt-3 text-cyan-400 hover:text-cyan-300 text-sm"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 relative overflow-hidden pb-20">
      {/* Futuristic grid overlay */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}></div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={i}
          className="fixed rounded-full bg-gradient-to-br from-cyan-400/30 to-purple-500/30"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            top: `${Math.random() * 100}vh`,
            left: `${Math.random() * 100}vw`,
            filter: 'blur(1px)',
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        ></div>
      ))}

      <div className="relative z-10 container mx-auto px-4 py-20">
        {/* Animated header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4">
            <span className="inline-block">AGENT NETWORK</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 mx-auto mb-6"></div>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg font-light">
            Manage our elite team of cyber operatives
          </p>
        </div>

        {/* Edit Form (when editing) */}
        {editingAgent && (
          <div className="bg-zinc-800/70 backdrop-blur-lg rounded-xl border border-cyan-400/30 p-8 mb-12 shadow-xl">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Edit Agent</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    required
                    className="w-full px-4 py-3 bg-zinc-800/70 border border-zinc-700/50 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 focus:border-cyan-500/50 transition-all"
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                    className="w-full px-4 py-3 bg-zinc-800/70 border border-zinc-700/50 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-purple-500/30 focus:border-purple-500/50 transition-all"
                  />
                </div>

                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone (Optional)"
                    className="w-full px-4 py-3 bg-zinc-800/70 border border-zinc-700/50 rounded-lg text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-amber-500/30 focus:border-amber-500/50 transition-all"
                  />
                </div>

                <div className="relative">
                  <label className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-zinc-700/50 rounded-lg bg-zinc-800/50 hover:bg-zinc-800/70 transition-all cursor-pointer">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-8 h-8 mb-3 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                      </svg>
                      <p className="text-sm text-zinc-400">
                        <span className="font-medium text-cyan-400">Update photo</span> (optional)
                      </p>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => setImage(e.target.files[0])} 
                      className="hidden" 
                    />
                  </label>
                  {image && (
                    <div className="mt-3 flex items-center justify-between bg-zinc-800/70 p-2 rounded-lg border border-zinc-700/30">
                      <div className="flex items-center space-x-2">
                        <div className="relative w-8 h-8 overflow-hidden rounded">
                          <img src={URL.createObjectURL(image)} alt="Preview" className="absolute inset-0 object-cover w-full h-full" />
                        </div>
                        <span className="text-sm text-zinc-300 truncate max-w-xs">{image.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setImage(null)}
                        className="text-zinc-400 hover:text-amber-400 transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-6 py-2.5 border border-zinc-700/50 text-zinc-300 rounded-lg hover:bg-zinc-800/70 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-600/80 to-purple-600/80 text-zinc-100 rounded-lg hover:from-cyan-500 hover:to-purple-500 transition-all"
                >
                  Update Agent
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Agent Cards */}
        {agents.length === 0 ? (
          <div className="bg-zinc-800/50 backdrop-blur-lg rounded-xl border border-zinc-700/50 p-12 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-zinc-800 rounded-full mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
            <h3 className="text-2xl font-medium text-zinc-200 mb-2">No Agents Found</h3>
            <p className="text-zinc-500">The network is currently empty. Add your first agent.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {agents.map((agent, index) => (
              <div 
                key={agent._id}
                className="relative group"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Card glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl transition-all duration-500 ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}`}></div>
                
                <div className="relative bg-zinc-800/50 backdrop-blur-lg rounded-xl border border-zinc-700/50 overflow-hidden transition-all duration-300 group-hover:border-cyan-400/30 h-full flex flex-col">
                  {/* Image with gradient overlay */}
                  <div className="relative h-48 overflow-hidden">
                    {agent.image ? (
                      <img 
                        src={`http://localhost:5000/uploads/${agent.image}`} 
                        alt={agent.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-cyan-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-zinc-900/10 to-transparent"></div>
                  </div>

                  {/* Agent info */}
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-xl font-bold text-zinc-100 mb-1">{agent.name}</h3>
                    <span className="text-sm text-cyan-400 font-mono mb-4">ID: {agent._id.slice(-6)}</span>
                    
                    <div className="mt-auto space-y-3">
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-zinc-400 ml-2 break-all">{agent.email}</span>
                      </div>
                      
                      {agent.phone && (
                        <div className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          <span className="text-zinc-400 ml-2">{agent.phone}</span>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="mt-6 flex space-x-2">
                      <button 
                        onClick={() => handleEdit(agent)}
                        className="flex-1 py-2 px-3 bg-zinc-700/50 hover:bg-cyan-600/80 text-zinc-300 rounded-lg transition-all flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(agent._id)}
                        className="flex-1 py-2 px-3 bg-zinc-700/50 hover:bg-red-600/80 text-zinc-300 rounded-lg transition-all flex items-center justify-center"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Animations */}
      <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
          100% { transform: translateY(0) translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default AgentList;