'use client'

import { useState } from 'react'

export default function Contact() {
  return (
    <div className="page-transition max-w-2xl mx-auto">
      <div className="mb-16">
        <h1 className="text-4xl font-light text-white">contact</h1>
        <div className="h-1 w-20 bg-gradient-to-r from-gray-500 to-transparent mt-2"></div>
      </div>
      
      <div className="space-y-16">
        <section className="space-y-6">
          <p className="text-lg text-gray-400">
            Feel free to reach out for collaborations or just to say hi.
          </p>
          <a
            href="mailto:your.email@monash.edu"
            className="text-white hover:text-gray-300 transition-colors flex items-center"
          >
            <span>your.email@monash.edu</span>
            <span className="ml-1">→</span>
          </a>
        </section>

        <section>
          <h2 className="text-xl text-gray-400 mb-8 flex items-center">
            <span className="mr-2">→</span> elsewhere
          </h2>
          <div className="space-y-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <span>github</span>
              <span className="ml-1">→</span>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <span>linkedin</span>
              <span className="ml-1">→</span>
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-400 hover:text-white transition-colors flex items-center"
            >
              <span>spotify</span>
              <span className="ml-1">→</span>
            </a>
          </div>
        </section>

        <section className="pt-8">
          <p className="text-sm text-gray-500">
            Based in Melbourne, Australia
          </p>
        </section>
      </div>
    </div>
  )
} 