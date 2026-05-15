const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createClient } = require("@supabase/supabase-js");

const app = express();
app.use(cors());
app.use(express.json());

/* ================= DEBUG SUPABASE ================= */
const SUPABASE_URL = "https://ogxcwfyrqvcatdgbbgml.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9neGN3ZnlycXZjYXRkZ2JiZ21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg4NjQ2MjcsImV4cCI6MjA5NDQ0MDYyN30.0leC0Ob6sLIgr68CF5XaTdRIRYRGf3T0cgJL3z7HqsA";

console.log("SUPABASE_URL:", SUPABASE_URL);
console.log("TIPO URL:", typeof SUPABASE_URL);

/* ================= SUPABASE ================= */
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

/* ================= JWT ================= */
const SECRET = "dambra_secret";

/* ================= TEST ROUTE ================= */
app.get("/", (req, res) => {
  res.send("SaaS rodando ok");
});

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const { data, error } = await supabase
    .from("users")
    .insert([{ email, password: hash }])
    .select();

  if (error) return res.json({ error });

  res.json(data[0]);
});

/* ================= LOGIN ================= */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data: user } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (!user) return res.json({ error: "user not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.json({ error: "wrong password" });

  const token = jwt.sign({ id: user.id }, SECRET);

  res.json({ token });
});

/* ================= START ================= */
app.listen(3000, () => {
  console.log("🔥 Dambra SaaS rodando na porta 3000");
});