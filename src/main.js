import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import init from './weather-interface';// imports JSON promise from html in the initialisation of the weather-interface w/captured html info
init(); //function run initialiazation init(); basically a constructor call on its class
import { BusinessSearch } from './yelp-api';

$(document).ready(function(){
  const businessSearch = new BusinessSearch();
  businessSearch.callBuisinessInfo("Seattle", "restaurant");
});