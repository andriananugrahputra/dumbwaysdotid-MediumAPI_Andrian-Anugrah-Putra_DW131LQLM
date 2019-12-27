'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert("articles", [
      {
        title: "3 reasons why you should learn Embedded Systems Programming",
        content:"I’ve been getting this questions, “So how would I get started with embedded development or how can I build robots and drones?” more and more often lately. I will begin by telling you what embedded systems really are and the essential reasons why you should acquire the knowledge. A lady embedded engineer and author of Making Embedded Systems — Elecia White, once said “Embedded systems are terrifying important” because it’s an increasingly interesting, disruptive and lucrative field for designs. Almost anything, from toasters and flashlights to smartwatches, digital TVs, smartphones, airplanes, and electronic control units in cars, has embedded software in it. We don’t generally think of those devices as computers, but they have underlying software that makes them run.",
        image:"https://miro.medium.com/max/511/1*tFdNLQpIn5sT5D5HEeCBHg.png",
        slug:"",
        is_published:1,
        is_archived:0,
        category_id:1,
        category_name:"",
        author_id:1
      },
      {
        title:"An introduction to Raspberry Pi 4 GPIO and controlling it with Node.js",
        content:"You might have come across the term “IoT”, it is an acronym for the Internet of Things. This basically means that a device (thing) that can be controlled from the internet. An example of an IoT would be smart bulbs in your house which can be controlled from your smartphone.",
        image:"https://miro.medium.com/max/6000/1*t-dr_5CrKf45RE0Uuww2sg.jpeg",
        slug:"",
        is_published:1,
        is_archived:0,
        category_id:1,
        category_name:"",
        author_id:1
      },
      {
        title:"How IoT can change the future of farming in droughts",
        content:"Many avocado farmers in California have been affected by this problem and have turned to new methods in growing avocados such as higher density planting, which produces more fruit with the same level of water use. However, Spirent Communications’ work in bringing connected monitoring to these farms may solve this problem in a better way, and reduce the high cost of water usage in these areas.",
        image:"https://miro.medium.com/max/1024/0*qX1udxegwGPi7RgC.",
        slug:"",
        is_published:1,
        is_archived:0,
        category_id:1,
        category_name:"",
        author_id:1
      },
      {
        title:"The Only Correct Holiday Gift Guide for Cats",
        content:"Many avocado farmers in California have been affected by this problem and have turned to new methods in growing avocados such as higher density planting, which produces more fruit with the same level of water use. However, Spirent Communications’ work in bringing connected monitoring to these farms may solve this problem in a better way, and reduce the high cost of water usage in these areas.",
        image:"https://miro.medium.com/max/2560/1*cgpt5vV8TTnDb7WbQbLH9A.jpeg",
        slug:"",
        is_published:1,
        is_archived:0,
        category_id:5,
        category_name:"",
        author_id:2
      },
      {
        title:"If Your Cat Has Ever Cheated On You, You’re Not Alone",
        content:"Many avocado farmers in California have been affected by this problem and have turned to new methods in growing avocados such as higher density planting, which produces more fruit with the same level of water use. However, Spirent Communications’ work in bringing connected monitoring to these farms may solve this problem in a better way, and reduce the high cost of water usage in these areas.",
        image:"https://miro.medium.com/max/1024/0*qX1udxegwGPi7RgC.",
        slug:"",
        is_published:1,
        is_archived:0,
        category_id:5,
        category_name:"",
        author_id:3
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
