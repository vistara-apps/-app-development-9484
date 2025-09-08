import React from 'react'

const FrameWrapper = ({ children }) => {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto max-w-xl px-4 py-6">
        <div className="glass-card rounded-lg p-6 shadow-card">
          {children}
        </div>
      </div>
    </div>
  )
}

export default FrameWrapper