import React, { useState } from 'react';
import './mutualAidForm.css';

export default function MutualAidForm({ onSubmit }) {
  const [type, setType] = useState('offering');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [visibility, setVisibility] = useState('group-only');

  const handleSubmit = (e) => {
    e.preventDefault();
    const entry = {
      type,
      content,
      tags: tags.split(',').map(tag => tag.trim()),
      visibility,
      timestamp: new Date().toISOString()
    };
    onSubmit(entry);
    setContent('');
    setTags('');
  };

  return (
    <form className="mutual-aid-form" onSubmit={handleSubmit}>
      <h2>🌿 I am tending to...</h2>

      <label>
        Type of Entry:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="offering">Offering</option>
          <option value="request">Request</option>
        </select>
      </label>

      <label>
        Your Words:
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Describe what you're working on, struggling with, or dreaming into..."
          rows={5}
        />
      </label>

      <label>
        Tags (comma-separated):
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. backend clarity, emotional overwhelm"
        />
      </label>

      <label>
        Visibility:
        <select value={visibility} onChange={(e) => setVisibility(e.target.value)}>
          <option value="group-only">Group Only</option>
          <option value="public">Public</option>
          <option value="anonymous">Anonymous</option>
        </select>
      </label>

      <button type="submit">✨ Submit to the Scroll</button>
    </form>
  );
}
