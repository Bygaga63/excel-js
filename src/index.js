import {Excel} from '@/components/excel/Excel';
import './scss/index.scss'
import {Header, Toolbar, Formula, Table} from '@/components';


const excel = new Excel('#app', {
  components: [
    Header,
    Toolbar,
    Formula,
    Table,
  ]
})
excel.render();
