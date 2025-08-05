import { APIRequestContext, expect } from '@playwright/test'

const WRITER_API_URL = process.env.WRITER_API_BASE_URL
const WRITER_API_KEY = process.env.WRITER_API_KEY
const DEFAULT_HEADERS = {
  Authorization: `Bearer ${WRITER_API_KEY}`,
  'Content-Type': 'application/json',
}

export async function getApplications(request: APIRequestContext) {
  const response = await request.get(`${WRITER_API_URL}/applications`, {
    headers: { ...DEFAULT_HEADERS },
  })
  expect(response.ok()).toBeTruthy()
  return response.json()
}

export async function getApplicationDetails(request: APIRequestContext, applicationId: string) {
  const response = await request.get(`${WRITER_API_URL}/applications/${applicationId}`, {
    headers: { ...DEFAULT_HEADERS },
  })
  expect(response.ok()).toBeTruthy()
  return response.json()
}

export async function getModels(request: APIRequestContext) {
  const response = await request.get(`${WRITER_API_URL}/models`, {
    headers: { ...DEFAULT_HEADERS },
  })
  expect(response.ok()).toBeTruthy()
  return response.json()
}

export async function generateText(request: APIRequestContext, promptBody: any) {
  const response = await request.post(`${WRITER_API_URL}/completions`, {
    headers: { ...DEFAULT_HEADERS },
    data: { ...promptBody },
  })
  expect(response.ok()).toBeTruthy()
  return response.json()
}
