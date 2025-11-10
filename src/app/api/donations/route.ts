import { NextRequest, NextResponse } from 'next/server';
import { Donation, PaymentMethod } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      petitionId,
      amount,
      currency = 'BRL',
      method,
      name,
      email,
      anonymous,
      message,
    } = body;

    // Validação
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    if (!method || !['pix', 'boleto', 'creditCard', 'paypal', 'stripe'].includes(method)) {
      return NextResponse.json(
        { error: 'Invalid payment method' },
        { status: 400 }
      );
    }

    // Criar doação
    const donation: Donation = {
      id: Date.now().toString(),
      petitionId,
      amount,
      currency,
      method: method as PaymentMethod,
      donorName: anonymous ? 'Anônimo' : name,
      donorEmail: email,
      anonymous: anonymous || false,
      message,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Processar pagamento baseado no método
    let paymentResult;
    try {
      paymentResult = await processPayment(donation);
    } catch (error) {
      return NextResponse.json(
        { error: 'Payment processing failed' },
        { status: 500 }
      );
    }

    // TODO: Salvar no banco de dados
    // TODO: Enviar email de confirmação
    // TODO: Track analytics event

    return NextResponse.json({
      success: true,
      donation: {
        ...donation,
        status: 'completed',
      },
      paymentUrl: paymentResult.url,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function processPayment(donation: Donation) {
  // Em produção, integrar com gateways de pagamento reais
  switch (donation.method) {
    case 'pix':
      // Integração com PixGG
      return {
        url: `/payment/pix/${donation.id}`,
        qrCode: 'mock-qr-code',
      };
    case 'boleto':
    case 'creditCard':
      // Integração com Asaas
      return {
        url: `/payment/asaas/${donation.id}`,
      };
    case 'paypal':
      // Integração com PayPal
      return {
        url: `/payment/paypal/${donation.id}`,
      };
    case 'stripe':
      // Integração com Stripe
      return {
        url: `/payment/stripe/${donation.id}`,
      };
    default:
      throw new Error('Unsupported payment method');
  }
}
