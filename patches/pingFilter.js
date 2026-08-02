import { definePatch, insert } from "../modUtils.js";

export default definePatch(({ matchCode, modifyCode }) => {

    matchCode(`if (!isNaN(mentionIndex) && mentionIndex >= 0 && mentionIndex < languageHolder.languageData.languageCodes.length) {
        text = text.replace("@" + mention, "@" + languageHolder.languageData.languageCodes[mentionIndex])
    }`, { addToDictionary: ["languageHolder", "languageData", "languageCodes"] })

    modifyCode(`notifications.push(message);
    ${insert(`if (__fx.pingFilter.isMuted(message)) return;`)}
    !settingsHolder.userSettings.data[14].value && message.id !== 7 && notificationSound.play();
    if (!messagePopup) { return }`)
})
