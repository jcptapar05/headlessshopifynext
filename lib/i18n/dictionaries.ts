export type Locale = "en" | "tl" | "zh";

export const dictionaries = {
  en: {
    nav: {
      home: "Home",
      shop: "Shop",
      about: "About",
      contact: "Contact",
      topBanner: "Free shipping on orders over $100 | New arrivals every week",
      account: "My Account",
    },
    shopPage: {
      title: "Shop All",
    },
    contactPage: {
      title: "Contact Us",
      description:
        "We are here to help. Reach out to us for any inquiries, and we will get back to you with the attention you deserve.",
      formTitle: "Send a Message",
    },
    aboutPage: {
      title: "Our Story",
      description: "Crafting timeless fashion with purpose, passion, and sustainability at heart",
    },
    privacyPage: {
      title: "Privacy Policy",
      lastUpdated: "Last updated",
      intro:
        'This Privacy Policy describes how Next Store (the "Site" or "we") collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.',
      sections: {
        collect: {
          title: "Collecting Personal Information",
          content:
            "When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases.",
        },
        use: {
          title: "Using Personal Information",
          content:
            "We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order.",
        },
      },
    },
    termsPage: {
      title: "Terms of Service",
      lastUpdated: "Last updated",
      intro:
        'This website is operated by Next Store. Throughout the site, the terms "we", "us" and "our" refer to Next Store.',
      sections: {
        service: {
          title: "Online Store Terms",
          content:
            "By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence.",
        },
        conditions: {
          title: "General Conditions",
          content: "We reserve the right to refuse service to anyone for any reason at any time.",
        },
      },
    },
    footer: {
      tagline: "Curated fashion for the modern individual. Sustainable, timeless, and crafted with care.",
      shop: "Shop",
      allProducts: "All Products",
      newArrivals: "New Arrivals",
      bestSellers: "Best Sellers",
      accessories: "Accessories",
      support: "Support",
      contactUs: "Contact",
      aboutUs: "About",
      faqs: "FAQs",
      shipping: "Shipping & Returns",
      stayUpdated: "Stay Updated",
      stayUpdatedDesc: "Subscribe to our newsletter for exclusive offers and the latest fashion news.",
      enterEmail: "Enter your email",
      rights: "Next Store. All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookies: "Cookie Policy",
    },
    common: {
      search: "Search",
    },
    search: {
      placeholder: "Search products...",
      trending: "Trending",
      collections: "Collections",
      products: "Products",
      noResults: "No results found.",
      viewAll: "View all results",
    },
    faqPage: {
      title: "Frequently Asked Questions",
      description: "Find answers to common questions about our products, shipping, and returns.",
      questions: [
        {
          q: "What is your return policy?",
          a: "We offer a 30-day return policy for all unused items in their original packaging. Please visit our Returns page for more details.",
        },
        {
          q: "How long does shipping take?",
          a: "Standard shipping typically takes 3-5 business days. Express shipping options are available at checkout.",
        },
        {
          q: "Do you ship internationally?",
          a: "Yes, we ship to select countries worldwide. Shipping costs and delivery times vary by location.",
        },
        {
          q: "How can I track my order?",
          a: "Once your order ships, you will receive a confirmation email with a tracking number and link.",
        },
        {
          q: "Can I change or cancel my order?",
          a: "Orders can be modified or cancelled within 1 hour of placement. Please contact support immediately.",
        },
      ],
    },
    shippingPage: {
      title: "Shipping & Returns",
      description: "Everything you need to know about our delivery and return policies.",
      sections: {
        delivery: {
          title: "Delivery Information",
          express: {
            title: "Express Delivery",
            desc: "1-2 business days",
            price: "P15.00",
          },
          standard: {
            title: "Standard Delivery",
            desc: "3-5 business days",
            price: "Free over P100",
          },
          international: {
            title: "International Shipping",
            desc: "7-14 business days",
            price: "Calculated at checkout",
          },
        },
        returns: {
          title: "Returns Policy",
          policy:
            "We want you to be completely satisfied with your purchase. If you're not happy with your order, we accept returns within 30 days of delivery.",
          points: [
            "Items must be unworn and in original condition",
            "Tags must still be attached",
            "Original packaging must be included",
            "Proof of purchase is required",
          ],
        },
      },
    },
  },
  tl: {
    nav: {
      home: "Tahanan",
      shop: "Mamili",
      about: "Tungkol",
      contact: "Makipag-ugnayan",
      topBanner: "Libreng pagpapadala sa mga order na higit sa $100 | Bagong dating linggo-linggo",
      account: "Aking Account",
    },
    shopPage: {
      title: "Mamili Lahat",
    },
    contactPage: {
      title: "Makipag-ugnayan",
      description:
        "Narito kami para tumulong. Makipag-ugnayan sa amin para sa anumang katanungan, at babalikan ka namin sa lalong madaling panahon.",
      formTitle: "Magpadala ng Mensahe",
    },
    aboutPage: {
      title: "Ang Aming Kwento",
      description: "Paggawa ng walang kupas na fashion na may layunin, pasyon, at pagmamalasakit sa kalikasan",
    },
    privacyPage: {
      title: "Patakaran sa Privacy",
      lastUpdated: "Huling na-update",
      intro:
        'Ang Patakaran sa Privacy na ito ay naglalarawan kung paano kinokolekta, ginagamit, at ibinunyag ng Next Store (ang "Site" o "kami") ang iyong Personal na Impormasyon kapag bumisita ka o bumili mula sa Site.',
      sections: {
        collect: {
          title: "Pagkolekta ng Personal na Impormasyon",
          content:
            "Kapag bumisita ka sa Site, kumukolekta kami ng tiyak na impormasyon tungkol sa iyong device, iyong pakikipag-ugnayan sa Site, at impormasyong kinakailangan upang maproseso ang iyong mga pagbili.",
        },
        use: {
          title: "Paggamit ng Personal na Impormasyon",
          content:
            "Ginagamit namin ang iyong personal na Impormasyon upang ibigay ang aming mga serbisyo sa iyo, na kinabibilangan ng: pag-aalok ng mga produkto para sa pagbebenta, pagproseso ng mga pagbabayad, pagpapadala at pagtupad ng iyong order.",
        },
      },
    },
    termsPage: {
      title: "Mga Tuntunin ng Serbisyo",
      lastUpdated: "Huling na-update",
      intro:
        'Ang website na ito ay pinapatakbo ng Next Store. Sa buong site, ang mga terminong "kami", "us" at "aming" ay tumutukoy sa Next Store.',
      sections: {
        service: {
          title: "Mga Tuntunin ng Online Store",
          content:
            "Sa pagsang-ayon sa mga Tuntunin ng Serbisyo na ito, kinakatawan mo na ikaw ay hindi bababa sa edad ng karamihan sa iyong estado o lalawigan ng tirahan.",
        },
        conditions: {
          title: "Pangkalahatang Kondisyon",
          content: "Inilalaan namin ang karapatang tumanggi sa serbisyo sa sinuman sa anumang dahilan sa anumang oras.",
        },
      },
    },
    footer: {
      tagline: "Piniling fashion para sa makabagong indibidwal. Sustainable, walang kupas, at gawang may pag-aalaga.",
      shop: "Mamili",
      allProducts: "Lahat ng Produkto",
      newArrivals: "Bagong Dating",
      bestSellers: "Mabenta",
      accessories: "Mga Aksesorya",
      support: "Suporta",
      contactUs: "Makipag-ugnayan",
      aboutUs: "Tungkol sa Amin",
      faqs: "Mga Tanong",
      shipping: "Pagpapadala at Pagsasauli",
      stayUpdated: "Manatiling Updated",
      stayUpdatedDesc:
        "Mag-subscribe sa aming newsletter para sa mga eksklusibong alok at pinakabagong balita sa fashion.",
      enterEmail: "Ilagay ang email",
      rights: "Next Store. Lahat ng karapatan ay nakareserba.",
      privacy: "Patakaran sa Privacy",
      terms: "Mga Tuntunin ng Serbisyo",
      cookies: "Patakaran sa Cookie",
    },
    common: {
      search: "Maghanap",
    },
    search: {
      placeholder: "Maghanap ng mga produkto...",
      trending: "Sikat",
      collections: "Mga Koleksyon",
      products: "Mga Produkto",
      noResults: "Walang nahanap na resulta.",
      viewAll: "Tingnan lahat ng resulta",
    },
    faqPage: {
      title: "Mga Madalas Itanong",
      description:
        "Maghanap ng mga sagot sa mga karaniwang tanong tungkol sa aming mga produkto, pagpapadala, at pagsasauli.",
      questions: [
        {
          q: "Ano ang inyong patakaran sa pagsasauli?",
          a: "Nag-aalok kami ng 30-araw na patakaran sa pagsasauli para sa lahat ng hindi nagamit na item sa kanilang orihinal na packaging. Bisitahin ang aming pahina ng Returns para sa karagdagang detalye.",
        },
        {
          q: "Gaano katagal ang pagpapadala?",
          a: "Ang karaniwang pagpapadala ay karaniwang tumatagal ng 3-5 araw ng trabaho. May mga express shipping option sa checkout.",
        },
        {
          q: "Nagpapadala ba kayo sa ibang bansa?",
          a: "Oo, nagpapadala kami sa mga piling bansa sa buong mundo. Ang gastos sa pagpapadala at oras ng pagdating ay nag-iiba depende sa lokasyon.",
        },
        {
          q: "Paano ko masusubaybayan ang aking order?",
          a: "Sa sandaling maipadala ang iyong order, makakatanggap ka ng email na may tracking number at link.",
        },
        {
          q: "Maaari ko bang baguhin o kanselahin ang aking order?",
          a: "Ang mga order ay maaaring baguhin o kanselahin sa loob ng 1 oras pagkatapos mag-order. Mangyaring makipag-ugnayan agad sa suporta.",
        },
      ],
    },
    shippingPage: {
      title: "Pagpapadala at Pagsasauli",
      description: "Lahat ng kailangan mong malaman tungkol sa aming mga patakaran sa pagpapadala at pagsasauli.",
      sections: {
        delivery: {
          title: "Impormasyon sa Pagpapadala",
          express: {
            title: "Express na Pagpapadala",
            desc: "1-2 araw ng trabaho",
            price: "$15.00",
          },
          standard: {
            title: "Karaniwang Pagpapadala",
            desc: "3-5 araw ng trabaho",
            price: "Libre sa higit $100",
          },
          international: {
            title: "Pandaigdigang Pagpapadala",
            desc: "7-14 araw ng trabaho",
            price: "Kalkulado sa checkout",
          },
        },
        returns: {
          title: "Patakaran sa Pagsasauli",
          policy:
            "Nais naming lubos kang masiyahan sa iyong pagbili. Kung hindi ka masaya sa iyong order, tumatanggap kami ng mga pagsasauli sa loob ng 30 araw.",
          points: [
            "Ang mga item ay dapat hindi nagamit at nasa orihinal na kondisyon",
            "Dapat nakakabit pa rin ang mga tag",
            "Kasama ang orihinal na packaging",
            "Kailangan ang patunay ng pagbili",
          ],
        },
      },
    },
  },
  zh: {
    nav: {
      home: "首页",
      shop: "商店",
      about: "关于",
      contact: "联系",
      topBanner: "满$100免运费 | 每周新品上架",
      account: "我的账户",
    },
    shopPage: {
      title: "所有商品",
    },
    contactPage: {
      title: "联系我们",
      description: "我们随时为您提供帮助。如有任何疑问，请联系我们，我们将尽快给您回复。",
      formTitle: "发送消息",
    },
    aboutPage: {
      title: "我们的故事",
      description: "用心制作永恒的时尚，充满激情和可持续性",
    },
    privacyPage: {
      title: "隐私政策",
      lastUpdated: "最后更新",
      intro: "本隐私政策描述了 Next Store（“网站”或“我们”）在您访问或从网站购买时如何收集、使用和披露您的个人信息。",
      sections: {
        collect: {
          title: "收集个人信息",
          content: "当您访问本网站时，我们会收集有关您的设备、您与本网站的互动以及处理您的购买所需的信息。",
        },
        use: {
          title: "使用个人信息",
          content: "我们使用您的个人信息向您提供我们的服务，其中包括：提供待售产品、处理付款、运输和履行您的订单。",
        },
      },
    },
    termsPage: {
      title: "服务条款",
      lastUpdated: "最后更新",
      intro: "本网站由 Next Store 运营。在整个网站中，术语“我们”、“我们”和“我们的”是指 Next Store。",
      sections: {
        service: {
          title: "在线商店条款",
          content: "同意这些服务条款，即表示您已达到居住州或省的法定成年年龄。",
        },
        conditions: {
          title: "一般条件",
          content: "我们保留随时以任何理由拒绝向任何人提供服务的权利。",
        },
      },
    },
    footer: {
      tagline: "为现代个人精心策划的时尚。可持续，永恒，精心制作。",
      shop: "商店",
      allProducts: "所有产品",
      newArrivals: "新品上市",
      bestSellers: "热销商品",
      accessories: "配饰",
      support: "支持",
      contactUs: "联系我们",
      aboutUs: "关于我们",
      faqs: "常见问题",
      shipping: "运输与退货",
      stayUpdated: "保持更新",
      stayUpdatedDesc: "订阅我们的通讯，获取独家优惠和最新时尚新闻。",
      enterEmail: "输入您的电子邮件",
      rights: "Next Store. 保留所有权利。",
      privacy: "隐私政策",
      terms: "服务条款",
      cookies: "Cookie 政策",
    },
    common: {
      search: "搜索",
    },
    search: {
      placeholder: "搜索产品...",
      trending: "流行趋势",
      collections: "系列",
      products: "产品",
      noResults: "未找到结果。",
      viewAll: "查看所有结果",
    },
    faqPage: {
      title: "常见问题",
      description: "查找有关我们产品、运输和退货的常见问题的解答。",
      questions: [
        {
          q: "你们的退货政策是什么？",
          a: "我们为所有未使用的原始包装商品提供30天退货政策。请访问我们的退货页面了解详情。",
        },
        {
          q: "运输需要多长时间？",
          a: "标准运输通常需要3-5个工作日。结账时可选择快递选项。",
        },
        {
          q: "你们支持国际运输吗？",
          a: "是的，我们向全球特定国家/地区发货。运费和交货时间因地点而异。",
        },
        {
          q: "我如何追踪我的订单？",
          a: "一旦您的订单发货，您将收到一封包含追踪号码和链接的确认电子邮件。",
        },
        {
          q: "我可以更改或取消订单吗？",
          a: "订单可在下单后1小时内修改或取消。请立即联系支持部门。",
        },
      ],
    },
    shippingPage: {
      title: "运输与退货",
      description: "您需要了解的有关我们交付和退货政策的一切。",
      sections: {
        delivery: {
          title: "交付信息",
          express: {
            title: "快递",
            desc: "1-2个工作日",
            price: "$15.00",
          },
          standard: {
            title: "标准运输",
            desc: "3-5个工作日",
            price: "满$100免费",
          },
          international: {
            title: "国际运输",
            desc: "7-14个工作日",
            price: "结账时计算",
          },
        },
        returns: {
          title: "退货政策",
          policy: "我们希望您对购买完全满意。如果您对订单不满意，我们在交货后30天内接受退货。",
          points: ["物品必须未穿过且处于原始状态", "标签必须仍然附着", "必须包含原始包装", "需要购买证明"],
        },
      },
    },
  },
};
