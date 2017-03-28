var rule = {};
rule.is_recommend_rule = function(text) {
    if (text.indexOf('おすすめ') !== -1) {
        return true;
    }
    if (text.indexOf('お勧め') !== -1) {
        return true;
    }
    return false;
};

rule.is_newer_rule = function(text) {
    if (text.indexOf('新作') !== -1) {
        return true;
    }
    return false;
};
module.exports = rule;