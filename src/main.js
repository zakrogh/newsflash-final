import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { BusinessSearch } from './yelp-api';

$(document).ready(function(){
  const businessSearch = new BusinessSearch();
  businessSearch.callBuisinessInfo("Seattle", "restaurant");
});
