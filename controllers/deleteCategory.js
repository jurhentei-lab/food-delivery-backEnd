
const Category = require("../models/category");

export async function DELETE(req, { params }) {
  try {
    await connectDB();

    const id = params.id;

    if (!id || id.length !== 24) {
      return NextResponse.json(
        { success: false, error: "ID буруу байна" },
        { status: 400 }
      );
    }

    const exists = await Category.findById(id);
    if (!exists) {
      return NextResponse.json(
        { success: false, error: "Категори олдсонгүй" },
        { status: 404 }
      );
    }

    const deleted = await Category.findByIdAndDelete(id);

    return NextResponse.json({ success: true, deleted });``
  } catch (err) {
    console.error("DELETE ERROR:", err);

    return NextResponse.json(
      { success: false, error: "Серверийн алдаа гарлаа" },
      { status: 500 }
    );
  }
}
