import * as React from 'react';
import { Html, Head, Preview, Body, Container, Section, Text } from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  company: string;
  message: string;
  submittedAt: string;
  ip: string;
}

export const ContactFormEmail = ({ name, email, company, message, submittedAt, ip }: ContactFormEmailProps) => (
  <Html>
    <Head />
    <Preview>New Contact Form Submission - Tesseract Integrations</Preview>
    <Body style={{ fontFamily: 'Arial, sans-serif', background: '#f9f9f9', color: '#333' }}>
      <Container style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
        <Section style={{ background: 'linear-gradient(135deg, #25FC11, #0C8102)', color: 'white', padding: 20, borderRadius: 10, marginBottom: 20 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>🚀 New Contact Form Submission</Text>
          <Text>Tesseract Integrations - AI Transformation Inquiry</Text>
        </Section>
        <Section style={{ background: '#fff', padding: 20, borderRadius: 10 }}>
          <Text><b>👤 Name:</b> {name}</Text>
          <Text><b>📧 Email:</b> {email}</Text>
          <Text><b>🏢 Company:</b> {company}</Text>
          <Text><b>💬 Message:</b><br />{message.split('\n').map((line, i) => <span key={i}>{line}<br /></span>)}</Text>
        </Section>
        <Section style={{ marginTop: 20, padding: 15, background: '#eee', borderRadius: 5, fontSize: 12, color: '#666' }}>
          <Text><b>Submission Details:</b></Text>
          <Text>📅 Date: {submittedAt}</Text>
          <Text>🌐 IP Address: {ip}</Text>
          <Text>🔗 Source: Tesseract Integrations Website Contact Form</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactFormEmail; 