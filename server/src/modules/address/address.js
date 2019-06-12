import Address from './address.model';

export const createAdd = async (data) => {
    try {
        const address = await Address.create({
            ...data,
            geo:{
                type: 'point',
                coords: [data.geo.lng, data.geo.lat],
            },
        })
        console.log('Create Address successful !!');
        
        return address;
    } catch (error) {
        throw error
    }
} 

export const getUserAdd = async (userId) => {
    try {
        const addresses = await Address.find({user: userId})
        return addresses;
    } catch (error) {
        throw error
    }
}

export const updateAdd = async (addressId, newAddressValues, userId) => {
    try {

      const address = await Address.findById(addressId);

      if (!address) {
        throw new Error('Address not exist');
      }

      if (address.user.toString() !== userId.toString()) {
        throw new Error('Unauthorized');
      }
      
      /*
        Object.keys trả về một mảng có value từng phần tử là String
        => Object.keys(newAddressValues) = ['street', 'town', 'city', 'province', 'city', 'instructions', 'geo','user']
      */
     
      Object.keys(newAddressValues).forEach(key => {
        if (key === 'geo') {
          address.geo.coords = [
            newAddressValues[key].lng,
            newAddressValues[key].lat,
          ];
        } 
        else {
          address[key] = newAddressValues[key];
        }
      });
      await address.save();
      console.log('Update address successful !!');
  
      return address;

    } catch (error) {
      throw error;
    }
  };

export const deleteAdd = async(addressId, userId) => {
  try {
    const address = await Address.findById(addressId);

    if (!address) {
      throw new Error('Address not exist');
    }

    if (address.user.toString() !== userId.toString()) {
      throw new Error('Unauthorized');
    }

    return address.remove()

  } catch (error) {
    throw error;
  }
}