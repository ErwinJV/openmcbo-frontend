// app/api/revalidate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    // 1. Validar el secreto de seguridad
    const secret = req.headers.get("x-revalidation-secret");

    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json(
        { message: "Token de revalidación inválido" },
        { status: 401 },
      );
    }

    // 2. Extraer el body de la petición
    const body = await req.json();
    const { table, action, id } = body;

    if (!table) {
      return NextResponse.json(
        { message: "El nombre de la tabla es requerido" },
        { status: 400 },
      );
    }

    // 3. Diccionario/Mapa para decidir qué rutas revalidar según la tabla
    // Esto es crucial para no revalidar todo el sitio entero, sino solo lo afectado.
    switch (table) {
      //   case "users":
      //     revalidatePath("/usuarios"); // Revalida la lista de usuarios
      //     // revalidatePath('/usuarios/[id]', 'page'); // Si necesitas revalidar páginas dinámicas específicas
      //     break;

      case "properties":
        revalidatePath("/", "page");
        revalidatePath("/inmuebles");
        if (id) {
          revalidatePath(`/inmuebles/${id}`, "page");
        }

        break;

      default:
        console.warn(
          `No hay rutas configuradas para revalidar la tabla: ${table}`,
        );
        break;
    }

    // 4. Retornar éxito
    return NextResponse.json({
      revalidated: true,
      table,
      action,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error("Error procesando el webhook de revalidación:", error);
    return NextResponse.json(
      { message: "Error interno del servidor al revalidar" },
      { status: 500 },
    );
  }
}
