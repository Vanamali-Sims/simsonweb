'use client'

import { useEffect, useRef } from 'react'

export default function MouseEffect() {
  const effectRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let frameId: number
    const effect = effectRef.current
    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    
    if (!effect || !cursor || !cursorDot) return

    let mouseX = 0
    let mouseY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Update mouse position
      mouseX = clientX
      mouseY = clientY

      // Calculate position relative to center (in percentage)
      const xPercent = (clientX / innerWidth - 0.5) * 2
      const yPercent = (clientY / innerHeight - 0.5) * 2

      // Update cursor position immediately
      cursorDot.style.transform = `translate(${clientX}px, ${clientY}px)`

      // Update background effect with smooth animation
      const xOffset = xPercent * 30 // max 30px offset
      const yOffset = yPercent * 30 // max 30px offset
      
      effect.style.transform = `
        translate3d(${xOffset}px, ${yOffset}px, 0)
        scale(1.1)
      `

      // Add subtle rotation based on mouse position
      effect.style.transform += ` rotateX(${yPercent * -2}deg) rotateY(${xPercent * 2}deg)`
    }

    const animateCursor = () => {
      // Smooth cursor following animation
      const ease = 0.15

      currentX += (mouseX - currentX) * ease
      currentY += (mouseY - currentY) * ease

      cursor.style.transform = `translate(${currentX}px, ${currentY}px)`
      
      frameId = requestAnimationFrame(animateCursor)
    }
    
    animateCursor()

    // Add cursor styles on hover over interactive elements
    const handleElementHover = () => {
      cursor.classList.add('scale-150')
      cursorDot.classList.add('opacity-0')
    }

    const handleElementLeave = () => {
      cursor.classList.remove('scale-150')
      cursorDot.classList.remove('opacity-0')
    }

    // Add hover effect to all interactive elements
    const interactiveElements = document.querySelectorAll('a, button')
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleElementHover)
      el.addEventListener('mouseleave', handleElementLeave)
    })

    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(frameId)
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleElementHover)
        el.removeEventListener('mouseleave', handleElementLeave)
      })
    }
  }, [])

  return (
    <>
      {/* Background effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div
          ref={effectRef}
          className="absolute inset-0 bg-gradient-to-br from-[#0a0a0b] via-[#131315] to-[#0a0a0b] transition-all duration-[100ms] ease-out will-change-transform"
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
        />
      </div>

      {/* Custom cursor */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {/* Larger cursor circle with torch effect */}
        <div
          ref={cursorRef}
          className="w-24 h-24 rounded-full fixed -ml-12 -mt-12 transition-transform duration-200 ease-out will-change-transform cursor-torch"
        />
        {/* Small cursor dot */}
        <div
          ref={cursorDotRef}
          className="w-1 h-1 bg-white rounded-full fixed transition-opacity duration-200 ease-out will-change-transform"
        />
      </div>
    </>
  )
} 