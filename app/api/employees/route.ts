// Api pour récupérer les employés d'une entreprise
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// route pour la création d'un employé
export async function GET(request: Request) {
  try {

    // récupération des paramètres de la requête
    const { searchParams } = new URL(request.url);

    // extraction des paramètres de la requête
    const companyId = searchParams.get("companyId");

    // Vérifier si l'id de l'entreprise est fourni
    if (!companyId) {
      return NextResponse.json(
        { message: "l'id de l'entreprise est requis" },
        { status: 400 }
      );
    }
    
  } catch (error) {
    console.error("Error getting companies", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}