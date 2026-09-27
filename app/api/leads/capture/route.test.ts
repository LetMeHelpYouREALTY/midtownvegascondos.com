/**
 * Test: /api/leads/capture Route Handler
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { POST } from './route';

describe('POST /api/leads/capture', () => {
  const originalApiKey = process.env.FOLLOW_UP_BOSS_API_KEY;
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    process.env.FOLLOW_UP_BOSS_API_KEY = 'test-fub-key';
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    process.env.FOLLOW_UP_BOSS_API_KEY = originalApiKey;
    vi.unstubAllGlobals();
  });

  it('returns 400 for an empty JSON body', async () => {
    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('required');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 503 when FOLLOW_UP_BOSS_API_KEY is missing', async () => {
    delete process.env.FOLLOW_UP_BOSS_API_KEY;

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.error).toBeDefined();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sends a Follow Up Boss event with valid data', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: true,
      status: 201,
    });

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        referer: 'https://midtownvegascondos.com/contact',
      },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '7025551234',
        message: 'Interested in buying',
        source: 'website-form',
        formType: 'contact',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0];
    expect(url).toBe('https://api.followupboss.com/v1/events');
    expect(options.method).toBe('POST');

    const payload = JSON.parse(options.body as string);
    expect(payload.source).toBe('midtownvegascondos.com');
    expect(payload.system).toBe('midtownvegascondos.com');
    expect(payload.type).toBe('General Inquiry');
    expect(payload.person.firstName).toBe('John');
    expect(payload.person.emails).toEqual([{ value: 'john@example.com' }]);
    expect(payload.person.tags).toContain('midtownvegascondos.com');
    expect(payload.person.tags).toContain('website-form');
  });

  it('returns 400 for invalid email', async () => {
    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'not-an-email',
        phone: '7025551234',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toContain('email');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('returns 502 when Follow Up Boss responds with an error', async () => {
    fetchMock.mockResolvedValueOnce({
      ok: false,
      status: 500,
    });

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(502);
    expect(data.error).toBeDefined();
  });

  it('maps seller form types to Seller Inquiry', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200 });

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        formType: 'home-valuation',
      }),
    });

    await POST(request);

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(payload.type).toBe('Seller Inquiry');
  });

  it('returns success without calling FUB when honeypot is filled', async () => {
    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: 'Bot',
        lastName: 'User',
        email: 'bot@example.com',
        company: 'Acme Spam LLC',
      }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('sanitizes XSS in names before sending to FUB', async () => {
    fetchMock.mockResolvedValueOnce({ ok: true, status: 200 });

    const request = new Request('http://localhost:3000/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: '<script>alert("xss")</script>',
        lastName: 'Doe',
        email: 'test@example.com',
      }),
    });

    await POST(request);

    const payload = JSON.parse(fetchMock.mock.calls[0][1].body as string);
    expect(payload.person.firstName).not.toContain('<script>');
  });
});
