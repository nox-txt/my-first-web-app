import express from "express";
import path from "path";
import { readFile, writeFile } from "fs/promises";

export const app = express();

const __dirname = import.meta.dirname;

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// /api/flashcards に GETリクエストが来たら "flashcards.json" の内容を返す
app.get("/api/flashcards", async (req, res) => {
  const flashcardsJsonPath = path.join(__dirname, "data", "flashcards.json");
  //変換したデータをクライアントにレスポンスとして返しています。
  const data = await readFile(flashcardsJsonPath, "utf-8");
  //JSON.parse を使うことで、JavaScriptが扱えるオブジェクト（配列）に変換
  const flashcardsList = JSON.parse(data);
  res.json(flashcardsList);
});

// /api/flashcards に POSTリクエストが来たら "flashcards.json" に追加し、追加したデータを返す
app.post("/api/flashcards", async (req, res) => {
  const flashcardsJsonPath = path.join(__dirname, "data", "flashcards.json");
  const data = await readFile(flashcardsJsonPath, "utf-8");
  const flashcardsList = JSON.parse(data);
  // リクエストボディから新しい単語データを取得する
  const newWord = req.body;
  // id がない場合は Date.now() で生成する
  newWord.id = newWord.id || Date.now();

  // 既存の単語一覧に新しい単語を追加する
  flashcardsList.push(newWord);

  // 更新された単語一覧をファイルに書き込む
  await writeFile(flashcardsJsonPath, JSON.stringify(flashcardsList, null, 2));

  // 新しく追加した単語データをレスポンスとして返す
  res.status(201).json(newWord);
});
