var myThemes = {};
myThemes.DropDownList = {
    dataSource: [
        {text: "Black", value: "black"},
        {text: "Blue Opal", value: "blueopal"},
        {text: "Bootstrap", value: "bootstrap"},
        {text: "Default", value: "default"},
        {text: "Fiori", value: "fiori"},
        {text: "Flat", value: "flat"},
        {text: "High Constrast", value: "hightcontrast"},
        {text: "Material Black", value: "materialblack"},
        {text: "Material", value: "material"},
        {text: "Metro Black", value: "metroblack"},
        {text: "Metro", value: "metro"},
        {text: "Moon Light", value: "moonlight"},
        {text: "Nova", value: "nova"},
        {text: "Office 365", value: "office365"},
        {text: "Silver", value: "silver"},
        {text: "Uniform", value: "uniform"}
    ],
    dataTextField: "text",
    dataValueField: "value",
    change: function (e) {
        var theme = (this.value() || "default").toLowerCase();
        myThemes.changeTheme(theme);
    }
};
// loads new stylesheet
myThemes.changeTheme = function (skinName, animate) {
    var doc = document,
            kendoLinks = $("link[href*='kendo.']"),
            commonLink = kendoLinks.filter("[href*='kendo.common']"),
            skinLink = kendoLinks.filter(":not([href*='kendo.common'])"),
            href = location.href,
            skinRegex = /kendo\.\w+(\.min)?\.css/i,
            extension = skinLink.attr("rel") === "stylesheet" ? ".css" : ".less",
            newSkinUrl = skinLink.attr("href").replace(skinRegex, "kendo." + skinName + "$1" + extension);
    function preloadStylesheet(file, callback) {
        var element = $("<link rel='stylesheet' href='" + file + "' \/>").appendTo("head");
        setTimeout(function () {
            callback();
            element.remove();
        }, 100);
    }
    function replaceTheme() {
        var browser = kendo.support.browser,
                oldSkinName = $(doc).data("kendoSkin"),
                newLink;
        if (browser.msie && browser.version < 10) {
            newLink = doc.createStyleSheet(newSkinUrl);
        } else {
            newLink = skinLink.eq(0).clone().attr("href", newSkinUrl);
            newLink.insertBefore(skinLink[0]);
        }

        skinLink.remove();
        $(doc.documentElement).removeClass("k-" + oldSkinName).addClass("k-" + skinName);
    }

    if (animate) {
        preloadStylesheet(url, replaceTheme);
    } else {
        replaceTheme();
    }
}
;
        