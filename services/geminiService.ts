
// FIX: Import Modality for image editing
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const storyText = `
珍珠奶茶
佮阿母去臺南拜拜閣食東食西，有夠歡喜。燒的好味滋，冷的食著心涼脾土開。有一味予阿母心花開，就是滑溜滑溜的真珠奶茶。
阿母笑講：「啊都牛奶茶濫粉圓。」
「是啊！真珠䮽粉圓仔仝宗的。」
粉圓按怎濫攏四序，熱天濫礤冰足清涼，寒天摻燒仙草上溫暖！哪會變「真珠」？古早頭家共牛奶茶䮽粉圓仔貯入去搖摵杯，搖咧，摵咧，袂輸起童，搖甲起波上好啉。後來就做一身機器尪仔鬥摵，若咧跳舞。接過來，欶一喙，粉圓仔就若坐電梯仝款，隨粒仔滑入來我的喙裡跳舞。捌有人共號做「水雞仔卵」，毋過猶是「真珠」得人疼。阮同學對美國轉來，講伊行過千山萬水猶是上思念這味。
彼改拜拜，阮查某囝有去求文昌帝君保庇伊考大學。阮有轉去說多謝，才知伊欲請神明啉真珠奶茶！神定著知影伊拍拚的志氣若真珠遐寶貴，伊的誠意若粉圓仔遐古錐，連神明啉著嘛心花開！
`;

export const getHint = async (context: string): Promise<string> => {
  const prompt = `
    你是一個密室逃脫的提示機器人。請根據以下這段關於珍珠奶茶的文章，以及玩家當前的問題，提供一個引導式、不直接說出答案的提示。提示的對象是國中生。

    文章："""${storyText}"""

    玩家的問題："""${context}"""

    請生成一個簡短的提示（繁體中文）：
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error getting hint from Gemini:", error);
    return "提示系統暫時無法使用，請再試一次。";
  }
};

export interface FunFact {
  text: string;
  sources: { uri: string; title: string; }[];
}

export const getFunFact = async (topic: string): Promise<FunFact | null> => {
  const prompt = `針對「${topic}」，提供一個有趣且適合國中生的冷知識。請用繁體中文回答，內容要簡潔，最多不超過100個字。`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks ?? [];
    
    const sources = groundingChunks
      .map(chunk => chunk.web)
      .filter((web): web is { uri: string; title: string } => !!(web?.uri && web.title));

    return { text, sources: sources.slice(0, 3) }; // Return text and up to 3 sources

  } catch (error) {
    console.error("Error getting fun fact from Gemini:", error);
    return {
        text: "無法取得相關趣聞，可能是網路問題或題材太新穎了！",
        sources: []
    };
  }
};
