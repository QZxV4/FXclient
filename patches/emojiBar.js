import { definePatch } from "../modUtils.js"

// The silly lil bar
export default definePatch(({ matchCode, insertCode, replaceCode }) => {

    // expose the sprite tile images to the settings picker
    matchCode(`ctx.drawImage(emojiHolder.emojiPicker.emojiTiles[pl - 1024 + emojiHolder.data.tileCount], 0, 0)`,
        { addToDictionary: ["emojiHolder", "emojiPicker", "emojiTiles"] })

    // expose the full picker grid 
    insertCode(`
        var flags = holder.emojiData.decodeFlags(flagData.flags);
        for (i = 0; i < flags.length; i++) { entries.push(flags[i]); }
        /* here */`,
        `__fx.emojiBar.grid = entries;`)

    replaceCode(
        `if (page === 0) { for (i = 0; i < 9; i++) { list.push(slots[i].pl); } }`,
        `if (page === 0) { for (i = 0; i < 9; i++) { list.push(__fx.emojiBar.slot(i, slots[i].pl)); } }`)

    // do not reorder the bar 
    replaceCode(
        `if (pl === 1024) { this.show(a, b, page + 1); return true; } reorder(pl);`,
        `if (pl === 1024) { this.show(a, b, page + 1); return true; } __fx.emojiBar.isCustom() || reorder(pl);`)
})
