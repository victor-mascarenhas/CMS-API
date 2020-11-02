function get_max_order(content, type) {
    let sf = null 
    
    if (type === 'service') {
        sf = content.services.service
    }
    else if (type === 'banner') {
         sf = content.banner
    }
    else if (type === 'infos') {
         sf = content.infos       
    }
    sf.sort(function (a, b) { return b.order - a.order })
        return sf[0].order + 1

}

module.exports = get_max_order;