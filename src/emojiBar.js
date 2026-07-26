import { getSettings } from "./settings.js";

// Every picker entry is a "pl" index, which is what the game stores and sends: sprite
// tiles are 1011-1023 (drawn by the game, shown as images), text emojis are 676 + their
// index below, and flags are anything under 676 (taken from the game's own picker grid).
const emojiFirst = 676, tileFirst = 1011;
const emojis = ["🥰", "😎", "😘", "😜", "🤗", "🥳", "😇", "😊", "🥱", "🙄", "🤔", "🥺", "😡", "😭", "😱", "😞", "💀", "👹", "👋", "🙏", "👏", "💪", "🙋‍♂️", "🤦‍♂️", "⬆️", "➡️", "⬇️", "⬅️", "👀", "❤️", "💔", "💥", "🔥", "🪦", "🥇", "🥈"];
const tileUrls = {};
// the fixed pages: the 13 sprite tiles then our emojis (the game's flags are added live)
const fixed = [...Array(13).keys()].map(i => tileFirst + i).concat(emojis.map((_, i) => emojiFirst + i));

function savedBar() {
    const bar = getSettings().emojiBar;
    return bar?.length === 9 ? bar : null;
}
function isCustom() {
    return Boolean(getSettings().customEmojiBar && savedBar());
}

const emojiBar = {
    grid: [], // the games full grid, filled by patches/emojiBar.js
    defaultBar: [1, 32, 16, 5, 34, 29, 13, 19, 20].map(i => emojiFirst + i),
    isCustom,
    slot: (i, fallback) => isCustom() ? savedBar()[i] : fallback,
    palette: () => fixed.concat(emojiBar.grid.filter(pl => pl < emojiFirst)),
    emojiFor: pl => pl >= tileFirst ? "" : pl >= emojiFirst ? emojis[pl - emojiFirst] || ""
        : String.fromCharCode(0xD83C, 0xDDE6 + Math.floor(pl / 26), 0xD83C, 0xDDE6 + pl % 26),
    tileFor(pl) {
        if (pl < tileFirst) return "";
        if (!tileUrls[pl]) {
            const canvas = window[dictionary.emojiHolder]?.[dictionary.emojiPicker]?.[dictionary.emojiTiles]?.[pl - tileFirst];
            if (canvas) tileUrls[pl] = canvas.toDataURL();
        }
        return tileUrls[pl] || "";
    },
};
export default emojiBar;
