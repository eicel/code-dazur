import { ItemType } from "./types";

export const DATA: Array<ItemType> = [{
		name: '+5 Dexterity Vest',
		sellIn: 10,
		quality: 20,
		id: 'vest_1',
		category: 'general',
		imageText: 'Cool Vest Image',
	}, {
		name: 'Aged Brie',
		sellIn: 2,
		quality: 0,
		id: 'wine_1',
		category: 'general',
		imageText: 'Awesome Wine Image',
	}, {
		name: 'Elixir of the Mongoose',
		sellIn: 5,
		quality: 7,
		id: 'elixir_1',
		category: 'general',
		imageText: 'Rare Elixir Image',
	}, {
		name: 'Sulfuras, Hand of Ragnaros',
		sellIn: 0,
		quality: 80,
		id: 'sulfuras_1',
		category: 'rare',
		imageText: 'Sulfuras Image',
	}, {
		name: 'Sulfuras, Hand of Ragnaros',
		sellIn: -1,
		quality: 80,
		id: 'sulfuras_2',
		category: 'rare',
		imageText: 'Sulfuras Image',
	}, {
		name: 'Backstage passes to a TAFKAL80ETC concert',
		sellIn: 15,
		quality: 20,
		id: 'backstage_1',
		category: 'general',
		imageText: 'Ticket Image',
	}, {
		name: 'Backstage passes to a TAFKAL80ETC concert',
		sellIn: 10,
		quality: 49,
		id: 'backstage_2',
		category: 'general',
		imageText: 'Ticket Image',
	}, {
		name: 'Backstage passes to a TAFKAL80ETC concert',
		sellIn: 5,
		quality: 49,
		id: 'backstage_3',
		category: 'general',
		imageText: 'Ticket Image',
	}, {
		name: 'Conjured Mana Cake',
		sellIn: 3,
		quality: 6,
		id: 'conjured_1',
		category: 'rare',
		imageText: 'Conjuted Image',
	}
];

export function updateQuality(items: Array<ItemType>) {
	for (let i = 0; i < items.length; i++) {
		if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
			if (items[i].quality > 0) {
				if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
					items[i].quality = items[i].quality - 1
				}
				if (items[i].name === 'Conjured Mana Cake') {
					items[i].quality = items[i].quality - 1
				}
			}
		} else {
			if (items[i].quality < 50) {
				items[i].quality = items[i].quality + 1
				if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
					if (items[i].sellIn < 11) {
						if (items[i].quality < 50) {
							items[i].quality = items[i].quality + 1
						}
					}
					if (items[i].sellIn < 6) {
						if (items[i].quality < 50) {
							items[i].quality = items[i].quality + 1
						}
					}
				}
			}
		}
		if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
			items[i].sellIn = items[i].sellIn - 1;
		}
		if (items[i].sellIn < 0) {
			if (items[i].name != 'Aged Brie') {
				if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
					if (items[i].quality > 0) {
						if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
							items[i].quality = items[i].quality - 1
						}
					}
				} else {
					items[i].quality = items[i].quality - items[i].quality
				}
			} else {
				if (items[i].quality < 50) {
					items[i].quality = items[i].quality + 1
				}
			}
		}
	}
	
	return items;
}

export const FILTER_DATA = [{
	key: 'all',
	value: 'All',
}, {
	key: 'general',
	value: 'General',
}, {
	key: 'rare',
	value: 'Rare',
}]