'use client'

import { useState } from 'react'

export default function Contact() {
  return (
    <div className="page-transition max-w-2xl mx-auto">
      <h1 className="text-3xl font-light text-white mb-12">contact</h1>
      
      <div className="space-y-12">
        <section className="space-y-4">
          <p className="text-lg text-gray-400">
            Feel free to reach out for collaborations or just to say hi.
          </p>
          <a
            href="mailto:your.email@monash.edu"
            className="text-white hover:text-gray-300 transition-colors"
          >
            your.email@monash.edu
          </a>
        </section>

        <section>
          <h2 className="text-lg text-gray-400 mb-6">elsewhere</h2>
          <div className="space-y-4">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-400 hover:text-white transition-colors"
            >
              github →
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-400 hover:text-white transition-colors"
            >
              linkedin →
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-gray-400 hover:text-white transition-colors"
            >
              spotify →
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