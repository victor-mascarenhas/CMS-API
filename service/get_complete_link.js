const config = require('config')

function get_complete_link(content) {

    const BUCKET_PUBLIC_PATH = process.env.BUCKET_PUBLIC_PATH || config.get('BUCKET_PUBLIC_PATH')

    content.about.photo = `${BUCKET_PUBLIC_PATH}${content.about.photo}`
    content.services.service.map(function (s) {
      s.photo = `${BUCKET_PUBLIC_PATH}${s.photo}`
    })
    content.banner.map(function (b) {
      b.photo = `${BUCKET_PUBLIC_PATH}${b.photo}`
    })
    content.infos.map(function (i) {
      i.photo = `${BUCKET_PUBLIC_PATH}${i.photo}`
    })
    return content

}

module.exports = get_complete_link;

