// ProductData.js
module.exports = {
	// Load mock data in localStorage
	init: function() {
		localStorage.clear();
		localStorage.setItem('product', JSON.stringify([
			{
		        id: '0011001',
		        name: 'Scotch.io Signature Lager',
		        image: 'scotch-beer.png',
		        description: 'The finest lager money can buy. Hints of keyboard aerosol, with a whiff of iKlear wipes on the nose. If you pass out while drinking this beverage, Chris Sevilleja personally tucks you in.',
		        variants: [
		          {
		            sku: '123140',
		            type: '40oz Bottle',
		            price: 4.99,
		            inventory: 1

		          },
		          {
		            sku: '123106',
		            type: '6 Pack',
		            price: 12.99,
		            inventory: 5
		          },
		          {
		            sku: '1231130',
		            type: '30 Pack',
		            price: 19.99,
		            inventory: 3
		          }
		        ]
		   	},
		   	
		   	{
		        id: '0011002',
		        name: 'Kingfisher Signature Premium Lager',
		        image: 'scotch-beer.png',
		        description: 'The finest lager money can buy. Hints of keyboard aerosol, with a whiff of iKlear wipes on the nose. If you pass out while drinking this beverage, Chris Sevilleja personally tucks you in.',
		        variants: [
		          {
		            sku: '123124',
		            type: '40oz Bottle',
		            price: 4.99,
		            inventory: 2

		          },
		          {
		            sku: '123125',
		            type: '6 Pack',
		            price: 12.99,
		            inventory: 5
		          },
		          {
		            sku: '1231236',
		            type: '30 Pack',
		            price: 19.99,
		            inventory: 3
		          }
		        ]
		   	}
		]));

	}
};