const banner = [
    {
    product_banner_photo = "",
    product = fk,
    direction = "L|R",
    order = 1
    }
]

const infos = [
    {
      icon: "",
      text: "",
      link: "",
      order = 1
    }    
]

const about = {
    photo: "",
    title: "",
    description: "",
    direction = "L|R"
}

const component_services = {
    title: "",
    description: "",
    service = [
        {
            photo: "",
            description: "",
            order = 1
        }
    ]
}

const product= {
    photo: "",
    title: "",
    category: fk,
    highlight: Boolean,
    description: "",
    complete_description: "",
    price: "",
    discount_price: "",
    discount_price_percent: "",
    last_modified_user: user_fk,
    last_modified_date: Date,
    status: Boolean
},

const category = {
    icon: "",
    name: "",
    status: Boolean
}

const user = {
    email: "",
    password: ""
}