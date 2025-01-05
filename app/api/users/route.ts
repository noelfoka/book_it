// api permettant d'enregistrer un utilisateur dans la base de données
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// route pour la création d'un utilisateur
export async function POST(request: Request) {
  try {
    
  } catch (error) {
    console.error('Erreur lors de la création d\'un utilisateur', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}