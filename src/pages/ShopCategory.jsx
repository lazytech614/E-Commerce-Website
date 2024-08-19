import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import all_product from '../constants/all_product'
import { ShopContext } from '../contexts/ShopContext'
import dropdown_icon from '/dropdown_icon.png'
import { Item } from '../components/Item/Item'
import { OfferBanner } from '../components/OfferBanner/OfferBanner'
import offer_banner_men_hero from '/offer_banner_men_hero.png'
import offer_banner_women_hero from '/offer_banner_women_hero.png'
import offer_banner_kids_hero from '/offer_banner_kids_hero.png'
import CustomDropdown from '../components/CustomDropDown/CustomDropDown'


export const ShopCategory = (props) => {

  const [formData, setFormData] = useState({
    sort: "",
  })
  const {all_product, randomOfferAmount, offerTimer} = useContext(ShopContext)

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData({ ...formData, [name]: value })
  }

  let heroIcon;

  switch(props.category){
    case 'men': 
      heroIcon = offer_banner_men_hero;
      break
    case 'women':
      heroIcon = offer_banner_women_hero;
      break;
    case 'kid':
      heroIcon = offer_banner_kids_hero;
      break;
  }

  return (
    <div>     
      <OfferBanner offerAmount={randomOfferAmount} timeLeft={offerTimer} heroIcon={heroIcon}/>
      <div className='px-4 sm:px-10 md:px-20 mb-[40px] md:mb-[100px]'>
        <div className='flex justify-between items-center my-[70px]'>
          <p className='text-[12px] sm:text-[16px]'><span className='font-semibold'>Showing 1-12</span> out of 36 products</p>
          <div className='w-[100px] sm:w-[200px]'>
            {/* Sort by <img className='w-[10px] sm:w-[16px]' src={dropdown_icon} alt='dropdown icon' /> */}
            <CustomDropdown 
              name='sort'
              value={formData.sort}
              onChange={(value) => handleChange({ target: { name: 'sort', value } })}
              placeholder='Sort by'
              options={[
                { value: 'Price high to low', label: 'Price high to low' },
                { value: 'Price low to high', label: 'Price low to high' },
                { value: 'Top rated', label: 'Top rated' }
              ]}/>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4 gap-y-6'>
          {all_product.map((item) => {
            if(props.category === item.category){
              return (
                <Item 
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  newPrice={item.new_price}
                  oldPrice={item.old_price}
                />
              )
            }else{
              return null
            }
          })}
        </div>
        <div className='w-[120px] sm:w-[140px] md:w-[180px] lg:w-[234px] h-[40px] sm:h-[50px] md:h-[60px] lg:h-[70px] bg-[#ededed] hover:bg-black duration-300 rounded-[40px] border border-[#171717] sm:rounded-[80px] text-[#171717] hover:text-white text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] flex items-center justify-center ml-auto mt-[40px] cursor-pointer'>
          Explore More
        </div>
      </div>
    </div>
  )
}
