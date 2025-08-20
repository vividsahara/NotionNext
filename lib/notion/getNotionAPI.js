// lib/getNotionAPI.js / .ts
import { NotionAPI } from 'notion-client'

let _client

export default function getNotionAPI() {
  if (_client) return _client

  _client = new NotionAPI({
    activeUser: process.env.NOTION_ACTIVE_USER,
    authToken: process.env.NOTION_TOKEN_V2,
    kyOptions: {
      hooks: {
        beforeRequest: [
          (request, options) => {
            const url = request.url.toString()
            if (url.includes('/api/v3/syncRecordValues')) {
              return new Request(
                url.replace('/api/v3/syncRecordValues', '/api/v3/syncRecordValuesMain'),
                options
              )
            }
            return request
          }
        ]
      }
    }
  })

  return _client
}
