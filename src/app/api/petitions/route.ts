import { NextRequest, NextResponse } from 'next/server';
import { Petition, Signature } from '@/types';

// Mock data - em produção viria de um banco de dados
const mockPetitions: Petition[] = [
  {
    id: '1',
    title: 'Proteção aos Animais de Rua',
    description: 'Campanha para criação de abrigos e programas de castração para animais de rua em nossa cidade.',
    creator: {
      id: '1',
      name: 'Associação Protetora dos Animais',
    },
    category: 'Meio Ambiente',
    tags: ['animais', 'proteção'],
    signatureCount: 1250,
    goal: 5000,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    featured: true,
    trending: true,
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const category = searchParams.get('category');
  const featured = searchParams.get('featured');

  if (id) {
    const petition = mockPetitions.find((p) => p.id === id);
    if (!petition) {
      return NextResponse.json({ error: 'Petition not found' }, { status: 404 });
    }
    return NextResponse.json(petition);
  }

  let filtered = [...mockPetitions];

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (featured === 'true') {
    filtered = filtered.filter((p) => p.featured);
  }

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { petitionId, fullName, email, anonymous } = body;

    // Validação básica
    if (!petitionId || !fullName || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Em produção, salvar no banco de dados
    const signature: Signature = {
      id: Date.now().toString(),
      petitionId,
      name: anonymous ? 'Anônimo' : fullName,
      email,
      anonymous: anonymous || false,
      createdAt: new Date().toISOString(),
    };

    // Atualizar contador de assinaturas
    const petition = mockPetitions.find((p) => p.id === petitionId);
    if (petition) {
      petition.signatureCount += 1;
    }

    // TODO: Track analytics event
    // trackEvent('petition_signed', { petitionId, anonymous });

    return NextResponse.json({ success: true, signature }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
