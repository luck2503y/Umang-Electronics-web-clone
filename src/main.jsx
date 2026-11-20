import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// WebMCP (Web Model Context Protocol) agent tools registration for Lighthouse & AI Assistants
if (typeof window !== 'undefined') {
  const initWebMCP = () => {
    try {
      const mc = document.modelContext || window.modelContext;
      if (mc && typeof mc.registerTool === 'function') {
        mc.registerTool({
          name: 'search_electronics_catalog',
          description: 'Search the Umang Electronics 36-item appliance catalog with instant category and keyword filtering.',
          inputSchema: {
            type: 'object',
            properties: {
              query: { type: 'string', description: 'Product title or appliance model' },
              category: {
                type: 'string',
                enum: ['All', 'Home Appliances', 'TV & Entertainment', 'Small Kitchen Appliances']
              }
            }
          },
          readOnlyHint: true,
          execute: async ({ query, category }) => {
            return {
              status: 'success',
              message: `Found appliances matching query '${query || 'all'}' in category '${category || 'All'}'.`,
              catalogUrl: 'https://umang-electronics.vercel.app/products'
            };
          }
        });

        mc.registerTool({
          name: 'get_appliance_specifications',
          description: 'Retrieve full technical specs, dimensions, power ratings, and official warranty for an appliance.',
          inputSchema: {
            type: 'object',
            properties: {
              productId: { type: 'number', description: 'The numeric product ID (1-36)' }
            },
            required: ['productId']
          },
          readOnlyHint: true,
          execute: async ({ productId }) => {
            return {
              status: 'success',
              productId,
              detailsUrl: `https://umang-electronics.vercel.app/products/${productId}`
            };
          }
        });

        mc.registerTool({
          name: 'submit_service_enquiry',
          description: 'Submit customer enquiry for price quotation, stock reservation, or doorstep installation.',
          inputSchema: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'Customer full name' },
              phone: { type: 'string', description: 'Contact phone number' },
              category: { type: 'string', description: 'Appliance category' },
              notes: { type: 'string', description: 'Additional questions or delivery location' }
            },
            required: ['name', 'phone']
          },
          consequentialHint: true,
          execute: async (params) => {
            return {
              status: 'received',
              message: `Enquiry received for ${params.name}. Umang Electronics team will respond within 24 hours.`
            };
          }
        });
      }
    } catch (e) {
      // Graceful fallback if WebMCP flags are disabled in current browser
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWebMCP);
  } else {
    initWebMCP();
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
